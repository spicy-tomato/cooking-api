import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { JwtValidateResponseDto } from 'src/authentication/dto';
import { AppConstants } from 'src/common/constants';
import { JwtUser } from 'src/common/decorators';
import LocalImageFileFieldsInterceptor from 'src/common/interceptors/local-image-file-fields.interceptor';
import { ToNumberPipe } from 'src/common/pipes';
import { UploadService } from '../upload/upload.service';
import { CreateFoodDto } from './dto';
import { Food } from './entities/food.entity';
import { FoodService } from './food.service';

@Controller('food')
export class FoodController {
  constructor(
    private readonly foodService: FoodService,
    private readonly uploadService: UploadService,
  ) {}

  @Get()
  async getByAccountId(
    @Query('id', ToNumberPipe) idAccount: number,
  ): Promise<Food[]> {
    return this.foodService.findByAccountId(idAccount);
  }

  @Get(':id')
  async getById(@Param('id', ToNumberPipe) idAccount: number): Promise<Food> {
    return this.foodService.details(idAccount);
  }

  @Post()
  @UseInterceptors(
    LocalImageFileFieldsInterceptor([
      { name: 'mainImage', maxCount: 1 },
      { name: 'stepImages', maxCount: AppConstants.MAX_FILES_UPLOAD_IN_ONCE },
    ]),
  )
  async create(
    @UploadedFiles()
    files: {
      mainImage: Array<Express.Multer.File>;
      stepImages: Array<Express.Multer.File>;
    },
    @Body() body: CreateFoodDto,
    @JwtUser() user: JwtValidateResponseDto,
  ): Promise<Food> {
    const image = await this.uploadService.uploadImage({
      idAccount: user.idAccount,
      name: files.mainImage[0].filename,
      type: 2,
      mimeType: files.mainImage[0].mimetype,
      uploadedAt: new Date(),
    });

    const food = await this.foodService.create(
      { ...body, timePost: new Date() },
      user.idAccount,
      image.id,
    );

    console.log(body);

    const stepImages = await this.uploadService.uploadImages(
      files.stepImages.map((f) => ({
        idAccount: user.idAccount,
        name: f.filename,
        type: 3,
        mimeType: f.mimetype,
        uploadedAt: new Date(),
      })),
    );

    await this.foodService.createSteps(body, food.id, stepImages);

    return food;
  }
}
