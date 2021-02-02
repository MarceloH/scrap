import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    url: string;

    @Column()
    image: string;
    
    @Column()
    price: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column('time with time zone')
    date: Date;
}

export default Product;