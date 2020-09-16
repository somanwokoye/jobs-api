import { Controller, Get, Post, Put, Delete, Param, Body, HttpException, HttpStatus, UseFilters, UsePipes, CacheKey, CacheTTL, UseInterceptors, CacheInterceptor, Render } from '@nestjs/common';
import { CreateJobDto} from './dto/create-job-dto';
import { JobsService } from './jobs.service';
import { Job } from './interfaces/job.interface';
import { ValidationPipe } from '../pipes/validation.pipe';
import { JobData } from '../decorators/jobdata.decorator';
import { ValidationExceptionFilter } from '../filters/validation-extception.filter';
import { BenchmarkInterceptor } from '../interceptors/benchmark.interceptor';


@Controller('jobs')
@UseInterceptors(CacheInterceptor, BenchmarkInterceptor)
export class JobsController {
    constructor(private readonly jobsService : JobsService){}

    @Get()
    @Render('jobs/index')
    @CacheKey('allJobs')
    @CacheTTL(25)
    root() {
        return this.jobsService
                   .findAll()
                   .then((result) => result ? { jobs: result }: { jobs: [] });
    }

    @Get(':id')
    @CacheTTL(30)
    findOne(@Param('id') id) : Promise<Job> {
        return this.jobsService.findOne(id)
            .then((result) => {
                if(result) {
                    return result;
                }
                else {
                    throw new HttpException('Job not found', HttpStatus.NOT_FOUND);
                }
            })
            .catch(() => {
                throw new HttpException('Job not found', HttpStatus.NOT_FOUND);
            });
    }

    @Post()
    @UseFilters(new ValidationExceptionFilter())
    create(@Body(ValidationPipe) createJobDto : CreateJobDto): Promise<Job> {
        return this.jobsService.create(createJobDto);
    }

    @Delete(':id')
    delete(@Param('id') id): Promise<Job> {
        return this.jobsService.delete(id);
    }

    @Put(':id')
    update(@Body() updateJobDto : CreateJobDto, @Param('id') id): Promise<Job> {
        return this.jobsService.update(id, updateJobDto);
    }
}
