import { Injectable } from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';
import { Prize } from 'src/models/prize.model';
import { CreatePrizeDto } from './dto/create-prize.dto';
import { UpdatePrizeDto } from './dto/update-prize.dto';

@Injectable()
export class PrizesService {
    private prisma = new PrismaClient();

    async findAll(): Promise<Prize[]> {
        const prizes = await this.prisma.prize.findMany({
            include: {
                laureates: true,
            },
        });

        return prizes.map(prize => ({
            id: prize.id,
            year: prize.year,
            category: prize.category,
            laureates: prize.laureates.map(laureate => ({
                id: laureate.id,
                firstname: laureate.firstname,
                surname: laureate.surname,
                motivation: laureate.motivation,
                share: laureate.share,
                prizeId: laureate.prizeId,
            })),
        }));
    }

    async findOne(id: string): Promise<Prize> {
        const prize = await this.prisma.prize.findUnique({
            where: { id },
            include: {
                laureates: true,
            },
        });

        if (!prize) {
            throw new Error('Prize not found');
        }

        return {
            id: prize.id,
            year: prize.year,
            category: prize.category,
            laureates: prize.laureates.map(laureate => ({
                id: laureate.id,
                firstname: laureate.firstname,
                surname: laureate.surname,
                motivation: laureate.motivation,
                share: laureate.share,
                prizeId: laureate.prizeId,
            })),
        };
    }

    async create(data: CreatePrizeDto): Promise<Prize> {
        const prize = await this.prisma.prize.create({
            data: {
                year: data.year,
                category: data.category,
                laureates: {
                    create: data.laureates?.map(laureate => ({
                        firstname: laureate.firstname,
                        surname: laureate.surname,
                        motivation: laureate.motivation,
                        share: laureate.share,
                    })) || [],
                },
            },
            include: {
                laureates: true,
            },
        });

        return {
            id: prize.id,
            year: prize.year,
            category: prize.category,
            laureates: prize.laureates.map(laureate => ({
                id: laureate.id,
                firstname: laureate.firstname,
                surname: laureate.surname,
                motivation: laureate.motivation,
                share: laureate.share,
                prizeId: laureate.prizeId,
            })),
        };
    }

    async update(id: string, data: UpdatePrizeDto): Promise<Prize> {
        const prize = await this.prisma.prize.update({
            where: { id },
            data: {
                year: data.year,
                category: data.category,
                laureates: data.laureates ? {
                    update: data.laureates.map(laureate => ({
                        where: {
                            id: laureate.id,
                        },
                        data: {
                            firstname: laureate.firstname,
                            surname: laureate.surname,
                            motivation: laureate.motivation,
                            share: laureate.share,
                        },
                    })),
                } : undefined,
            },
            include: {
                laureates: true,
            },
        });

        return {
            id: prize.id,
            year: prize.year,
            category: prize.category,
            laureates: prize.laureates.map(laureate => ({
                id: laureate.id,
                firstname: laureate.firstname,
                surname: laureate.surname,
                motivation: laureate.motivation,
                share: laureate.share,
                prizeId: laureate.prizeId,
            })),
        };
    }

    async delete(id: string): Promise<Prize> {
        const prize = await this.prisma.prize.delete({
            where: { id },
            include: {
                laureates: true,
            },
        });

        return {
            id: prize.id,
            year: prize.year,
            category: prize.category,
            laureates: prize.laureates.map(laureate => ({
                id: laureate.id,
                firstname: laureate.firstname,
                surname: laureate.surname,
                motivation: laureate.motivation,
                share: laureate.share,
                prizeId: laureate.prizeId,
            })),
        };
    }
}
