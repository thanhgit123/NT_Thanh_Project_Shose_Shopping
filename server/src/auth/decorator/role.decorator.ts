import { SetMetadata } from '@nestjs/common';
import { Role } from '../decorator/role.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);