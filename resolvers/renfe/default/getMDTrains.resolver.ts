import { ResolverFn } from '../../../core/types';

export const getMDTrainsResolver: ResolverFn = (_req, res) => {
  res.status(200).json({ trains: [], source: 'resolver' });
};
