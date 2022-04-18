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
import { CreateFoodDto, CreateRateDto } from './dto';
import { Food, Rate } from './entities';
import { FoodService } from './food.service';

@Controller('food')
export class FoodController {
  constructor(
    private readonly foodService: FoodService,
    private readonly uploadService: UploadService,
  ) {}

  @Get()
  async getMyFood(@JwtUser() user: JwtValidateResponseDto,
    @Query('page_num',ToNumberPipe) page_num: number,
    @Query('page_size',ToNumberPipe) page_size:number 
    ): Promise<Food[]> {
    return this.foodService.findByAccountId(user.idAccount,page_num,page_size);
  }

  @Get()
  async getByAccountId(
    @Query('id', ToNumberPipe) idAccount: number,
    @Query('page_num',ToNumberPipe) page_num: number,
    @Query('page_size',ToNumberPipe) page_size:number 
  ): Promise<Food[]> {
    return this.foodService.findByAccountId(idAccount,page_num,page_size);
  }

  @Get('rated')
  async getRatedFood(@JwtUser() user: JwtValidateResponseDto,
    @Query('page_num',ToNumberPipe) page_num: number,
    @Query('page_size',ToNumberPipe) page_size:number ): Promise<Food[]> {
    return this.foodService.findRated(user.idAccount,page_num,page_size);
  }

  @Get(':id')
  async getById(@Param('id', ToNumberPipe) id: number): Promise<Food> {
    return this.foodService.find(id);
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
    });

    const food = await this.foodService.create(body, user.idAccount, image.id);

    const stepImages = await this.uploadService.uploadImages(
      files.stepImages.map((f) => ({
        idAccount: user.idAccount,
        name: f.filename,
        type: 3,
        mimeType: f.mimetype,
      })),
    );

    await this.foodService.createSteps(body, food.id, stepImages);

    return food;
  }

  @Get(':id/rating')
  async getRate(
    @Param('id', ToNumberPipe) id: number,
    @Query('page_num',ToNumberPipe) page_num: number,
    @Query('page_size',ToNumberPipe) page_size:number): 
    Promise<Rate[]> {
    return this.foodService.findRate(id,page_num,page_size);
  }

  @Post(':id/rating')
  async createRate(
    @Body() body: CreateRateDto,
    @Param('id', ToNumberPipe) id: number,
    @JwtUser() user: JwtValidateResponseDto,
  ): Promise<Rate> {
    return this.foodService.createRate(body, user.idAccount, id);
  }
}
