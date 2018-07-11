import { combineResolvers, skip } from 'graphql-resolvers';

export const isAuthenticated = (parent, args, { me }) =>
  me ? skip : new Error('NOT_AUTHENTICATED');

export const isAdmin = combineResolvers(
  isAuthenticated,
  (parent, args, { me: { role } }) =>
    role === 'ADMIN' ? skip : new Error('NOT_AUTHORIZED_AS_ADMIN'),
);

export const isMessageOwner = async (
  parent,
  { id },
  { models, me },
) => {
  const message = await models.Message.findById(id, { raw: true });

  if (message.userId !== me.id) {
    throw new Error('NOT_AUTHORIZED_AS_OWNER');
  }

  return skip;
};
