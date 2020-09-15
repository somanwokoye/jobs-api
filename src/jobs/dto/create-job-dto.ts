import  { IsString, IsInt } from 'class-validator';

export class CreateJobDto{
    @IsString()
    readonly title: string;

    @IsInt()
    readonly salary: number;
}