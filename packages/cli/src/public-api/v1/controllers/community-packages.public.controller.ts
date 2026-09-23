import { communityPackageNameParamSchema } from '@n8n/api-types';
import type { AuthenticatedRequest } from '@n8n/db';
import {
	ApiDescription,
	ApiErrorResponse,
	ApiKeyScope,
	ApiResponse,
	ApiSummary,
	ApiTags,
	Delete,
	Param,
	PublicApiController,
} from '@n8n/decorators';
import type { Response } from 'express';

import { CommunityPackagesLifecycleService } from '@/modules/community-packages/community-packages.lifecycle.service';

@PublicApiController('/community-packages')
export class CommunityPackagesPublicController {
	constructor(
		private readonly communityPackagesLifecycleService: CommunityPackagesLifecycleService,
	) {}

	@Delete('/:name')
	@ApiKeyScope('communityPackage:uninstall')
	@ApiSummary('Uninstall a community package')
	@ApiDescription('Uninstall a community package by name.')
	@ApiTags(['CommunityPackage'])
	@ApiResponse(204)
	@ApiErrorResponse(400)
	@ApiErrorResponse(404)
	async uninstallPackage(
		req: AuthenticatedRequest,
		_res: Response,
		@Param('name', communityPackageNameParamSchema) packageName: string,
	): Promise<void> {
		await this.communityPackagesLifecycleService.uninstall(packageName, req.user, 'notFound');
	}
}
