import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CreateJobDto} from './dto/create-job-dto';
import { JobsService } from './jobs.service';
import { Job } from './interfaces/job.interface';

@Controller('jobs')
export class JobsController {
    constructor(private readonly jobsService : JobsService){}

    @Get()
    finadall(): Promise<Job[]> {
        return this.jobsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id) : Promise<Job> {
        return this.jobsService.findOne(id);
    }

    @Post()
    create(@Body() createJobDto : CreateJobDto): Promise<Job> {
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
