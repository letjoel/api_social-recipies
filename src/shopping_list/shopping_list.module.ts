import { Module } from '@nestjs/common';
import { ShoppingListService } from './shopping_list.service';
import { ShoppingListController } from './shopping_list.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ShoppingList, ShoppingListSchema } from './schema/shopping_list.schema';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants/jwt.constants';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ShoppingList.name, schema: ShoppingListSchema }]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1440h' },
    })
  ],
  controllers: [ShoppingListController],
  providers: [ShoppingListService]
})
export class ShoppingListModule {}
