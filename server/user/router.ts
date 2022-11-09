import type {Request, Response} from 'express';
import express from 'express';
import FreetCollection from '../freet/collection';
import UserCollection from './collection';
import * as userValidator from '../user/middleware';
import * as util from './util';

const router = express.Router();

/**
 * View the user object associated with a username.
 * 
 * @name GET /api/users/:username
 * 
 * @return {UserResponse} - an object with the user's details
 * @throws {404} - if the `username` does not exist
 */
router.get(
  '/:username',
  async (req: Request, res: Response) => {
    const user = await UserCollection.findOneByUsername(req.params.username);
    if (!user) {
      res.status(404).json({
        error: `User with username ${req.params.username} does not exist.`,
      });
      return;
    }
    res.status(200).json(util.constructUserResponse(user));
  }
);

/**
 * Create a new user account
 *
 * @name POST /api/users
 *
 * @param {string} username - the user's username
 * @param {string} password - the user's password
 * @return {UserResponse} - an object with the created user's details (without password)
 * @throws {403} - if there is a user already logged in
 * @throws {409} - if `username` is already in use
 * @throws {400} - if `username` or `password` is in the wrong format
 *
 */
router.post(
  '/',
  [
    userValidator.isUserLoggedOut,
    userValidator.isValidUsername,
    userValidator.isUsernameNotAlreadyInUse,
    userValidator.isValidPassword
  ],
  async (req: Request, res: Response) => {
    const user = await UserCollection.addOne(req.body.username, req.body.password);
    req.session.userId = user._id.toString();
    res.status(201).json({
      message: `Your account was created successfully. You have been logged in as ${user.username}`,
      user: util.constructUserResponse(user)
    });
  }
);

/**
 * Update the user's profile
 *
 * @name PATCH /api/users
 *
 * @param {string} username - the user's new username
 * @param {string} password - the user's new password
 * @return {UserResponse} - an object with the updated user details (without password)
 * @throws {403} - if the user is not logged in
 * @throws {409} - if the `username` is already in use
 * @throws {400} - if `username` or `password` is in the wrong format
 */
router.patch(
  '/',
  [
    userValidator.isUserLoggedIn,
    userValidator.isValidUsername,
    userValidator.isUsernameNotAlreadyInUse,
    userValidator.isValidPassword
  ],
  async (req: Request, res: Response) => {
    const userId = (req.session.userId as string) ?? ''; // Will not be an empty string since its validated in isUserLoggedIn
    const user = await UserCollection.updateOne(userId, req.body);
    res.status(200).json({
      message: 'Your profile was updated successfully.',
      user: util.constructUserResponse(user)
    });
  }
);

/**
 * Delete user
 *
 * @name DELETE /api/users
 *
 * @return {string} - a success message
 * @throws {403} - if the user is not logged in
 */
router.delete(
  '/',
  [
    userValidator.isUserLoggedIn
  ],
  async (req: Request, res: Response) => {
    const userId = (req.session.userId as string) ?? ''; // Will not be an empty string since its validated in isUserLoggedIn
    await UserCollection.deleteOne(userId);
    await FreetCollection.deleteMany(userId);
    req.session.userId = undefined;
    res.status(200).json({
      message: 'Your account has been deleted successfully.'
    });
  }
);

/**
 * Sign in user
 *
 * @name POST /api/users/session
 *
 * @param {string} username - the user's username
 * @param {string} password - the user's password
 * @return {UserResponse} - an object with user's details (without password)
 * @throws {403} - if the user is already signed in
 * @throws {400} - if `username` or `password` is not in correct format or missing in the req
 * @throws {401} - if the user login credentials are invalid
 *
 */
router.post(
  '/session',
  [
    userValidator.isUserLoggedOut,
    userValidator.isValidUsername,
    userValidator.isValidPassword,
    userValidator.isAccountExists
  ],
  async (req: Request, res: Response) => {
    const user = await UserCollection.findOneByUsernameAndPassword(
      req.body.username, req.body.password
    );
    req.session.userId = user._id.toString();
    res.status(201).json({
      message: 'You have logged in successfully',
      user: util.constructUserResponse(user)
    });
  }
);

/**
 * Get the signed in user
 *
 * @name GET /api/users/session
 *
 * @return - currently logged in user, or null if not logged in
 */
router.get(
  '/session',
  [],
  async (req: Request, res: Response) => {
    const user = await UserCollection.findOneByUserId(req.session.userId);
    res.status(200).json({
      message: 'Your session info was found successfully.',
      user: user ? util.constructUserResponse(user) : null
    });
  }
);

/**
 * Sign out user
 *
 * @name DELETE /api/users/session
 *
 * @return {string} - a success message
 * @throws {403} - if the user is not logged in
 *
 */
router.delete(
  '/session',
  [
    userValidator.isUserLoggedIn
  ],
  (req: Request, res: Response) => {
    req.session.userId = undefined;
    res.status(200).json({
      message: 'You have been logged out successfully.'
    });
  }
);

export {router as userRouter};
