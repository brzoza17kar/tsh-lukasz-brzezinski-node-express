import { IsString, IsNotEmpty, MaxLength, Min, Max, ArrayUnique, ArrayNotEmpty, IsArray, IsOptional, IsUrl, IsInt, IsNumberString, MinLength, IsDefined } from 'class-validator';
import { AreValidGenres } from "../controllers/validation";
import { Expose } from 'class-transformer';

export class NewMovieDto {
    @IsDefined()
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    title!: String;

    @IsDefined()
    @IsInt()
    @Min(1878) // "The Horse In Motion" - The oldest surviving movie
    @Max(new Date().getFullYear())
    year!: number;

    @IsDefined()
    @IsInt()
    @Min(1)
    @Max(1260) // "Amra Ekta Cinema Banabo" - The longest running cinematic movie
    runtime!: number;

    @IsDefined()
    @IsArray()
    @ArrayNotEmpty()
    @ArrayUnique()
    @AreValidGenres({
        message: "Genres should be selected from the existing ones"
    })
    genres!: String[];

    @IsDefined()
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    director!: String;

    @IsOptional()
    @IsString()
    actors!: String;

    @IsOptional()
    @IsString()
    plot!: String;

    @IsOptional()
    @IsString()
    @IsUrl()
    posterUrl!: String;
}

export class MoviesQueryDto {
    @IsOptional()
    @IsArray()
    @ArrayNotEmpty()
    @ArrayUnique()
    @AreValidGenres({
        message: "Genres should be selected from the existing ones"
    })
    genres!: string[];

    @IsOptional()
    @IsNumberString({
        no_symbols: true
    })
    @MinLength(1)
    @MaxLength(4)
    runtime!: number;
}