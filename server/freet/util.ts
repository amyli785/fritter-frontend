import type {HydratedDocument, StringSchemaDefinition, Types} from 'mongoose';
import moment from 'moment';
import type {Freet, PopulatedFreet} from '../freet/model';
import FreetCollection from './collection';

// Update this if you add a property to the Freet type!
type FreetResponse = {
  _id: string;
  authorId: string;
  author: string;
  dateCreated: string;
  dateModified: string;
  content: string;
  audience: string[];
  responseThreadId: string;
  responses: string[];
  responseTo: string;
};

type FreetResponseFull = {
  _id: string;
  authorId: string;
  author: string;
  dateCreated: string;
  dateModified: string;
  content: string;
  audience: string[];
  responseThreadId: string;
  responses: FreetResponseFull[];
  responseTo: string;
};

/**
 * Encode a date as an unambiguous string
 *
 * @param {Date} date - A date object
 * @returns {string} - formatted date as string
 */
const formatDate = (date: Date): string => moment(date).format('MMMM Do YYYY, h:mm:ss a');

/**
 * Transform a raw Freet object from the database into an object
 * with all the information needed by the frontend
 *
 * @param {HydratedDocument<Freet>} freet - A freet
 * @returns {FreetResponse} - The freet object formatted for the frontend
 */
const constructFreetResponse = (freet: HydratedDocument<Freet>): FreetResponse => {
  const freetCopy: PopulatedFreet = {
    ...freet.toObject({
      versionKey: false // Cosmetics; prevents returning of __v property
    })
  };
  return {
    _id: freetCopy._id.toString(),
    authorId: freetCopy.authorId._id.toString(),
    author: freetCopy.authorId.username,
    dateCreated: formatDate(freetCopy.dateCreated),
    dateModified: formatDate(freetCopy.dateModified),
    content: freetCopy.content,
    audience: freetCopy.audience.map((group) => group._id.toString()),
    responseThreadId: freetCopy.responseThreadId._id.toString(),
    responses: freetCopy.responses.map(response => response._id.toString()),
    responseTo: freetCopy.responseTo ? freetCopy.responseTo._id.toString() : '',
  };
};

/**
 * Transform a raw Freet object from the database into an object
 * with all the information needed by the frontend
 *
 * @param {HydratedDocument<Freet>} freet - A freet
 * @returns {FreetResponse} - The freet object formatted for the frontend
 */
 const constructFreetResponseFull = async (freet: HydratedDocument<Freet>): Promise<FreetResponseFull> => {
  const responses = await Promise.all(freet.responses.map(async (response: Types.ObjectId) => {
    const responseFreet = await FreetCollection.findOne(response);
    return constructFreetResponseFull(responseFreet);
  }));

  const freetCopy: PopulatedFreet = {
    ...freet.toObject({
      versionKey: false // Cosmetics; prevents returning of __v property
    })
  };

  const freetResponseFull = {
    _id: freetCopy._id.toString(),
    authorId: freetCopy.authorId._id.toString(),
    author: freetCopy.authorId.username,
    dateCreated: formatDate(freetCopy.dateCreated),
    dateModified: formatDate(freetCopy.dateModified),
    content: freetCopy.content,
    audience: freetCopy.audience.map((group) => group._id.toString()),
    responseThreadId: freetCopy.responseThreadId._id.toString(),
    responses: responses,
    responseTo: freetCopy.responseTo ? freetCopy.responseTo._id.toString() : '',
  };

  return freetResponseFull;
};

export {
  constructFreetResponse,
  constructFreetResponseFull,
};
