import { ResolverFn } from '../../../../core/types';

export const getMDFaresResolver: ResolverFn = (_req, res) => {
  res.status(200).json({ fares: [], custom: true });
};
