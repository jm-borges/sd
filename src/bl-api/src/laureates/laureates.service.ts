import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Laureate } from 'src/models/laureate.model';
import { CreateLaureateDto } from './dto/create-laureate.dto';
import { UpdateLaureateDto } from './dto/update-laureate.dto';

@Injectable()
export class LaureatesService {
    private prisma = new PrismaClient();

    async findAll(): Promise<Laureate[]> {
        const laureates = await this.prisma.laureate.findMany();
        return laureates.map(laureate => ({
            id: laureate.id,
            firstname: laureate.firstname,
            surname: laureate.surname,
            motivation: laureate.motivation,
            share: laureate.share,
            prizeId: laureate.prizeId,
        }));
    }

    async findOne(id: string): Promise<Laureate> {
        const laureate = await this.prisma.laureate.findUnique({
            where: { id },
        });

        if (!laureate) {
            throw new Error('Laureate not found');
        }

        return {
            id: laureate.id,
            firstname: laureate.firstname,
            surname: laureate.surname,
            motivation: laureate.motivation,
            share: laureate.share,
            prizeId: laureate.prizeId,
        };
    }

    async create(data: CreateLaureateDto): Promise<Laureate> {
        const laureate = await this.prisma.laureate.create({
            data: {
                firstname: data.firstname,
                surname: data.surname,
                motivation: data.motivation,
                share: data.share,
                prizeId: data.prizeId,
            },
        });

        return {
            id: laureate.id,
            firstname: laureate.firstname,
            surname: laureate.surname,
            motivation: laureate.motivation,
            share: laureate.share,
            prizeId: laureate.prizeId,
        };
    }

    async update(id: string, data: UpdateLaureateDto): Promise<Laureate> {
        const laureate = await this.prisma.laureate.update({
            where: { id },
            data: {
                firstname: data.firstname,
                surname: data.surname,
                motivation: data.motivation,
                share: data.share,
            },
        });

        return {
            id: laureate.id,
            firstname: laureate.firstname,
            surname: laureate.surname,
            motivation: laureate.motivation,
            share: laureate.share,
            prizeId: laureate.prizeId,
        };
    }

    async delete(id: string): Promise<Laureate> {
        const laureate = await this.prisma.laureate.delete({
            where: { id },
        });

        return {
            id: laureate.id,
            firstname: laureate.firstname,
            surname: laureate.surname,
            motivation: laureate.motivation,
            share: laureate.share,
            prizeId: laureate.prizeId,
        };
    }
}
