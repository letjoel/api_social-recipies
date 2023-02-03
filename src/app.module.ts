import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as dotenv from 'dotenv';
import { MongooseModule } from '@nestjs/mongoose';
import { RecipeModule } from './recipe/recipe.module';
import { GroupModule } from './group/group.module';
import { IngredientModule } from './ingredient/ingredient.module';
import { UserModule } from './user/user.module';
import { NotificationsModule } from './notifications/notifications.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/guards/roles.guard';
import { FavoritesModule } from './favorites/favorites.module';
import { ShoppingListModule } from './shopping_list/shopping_list.module';

dotenv.config()


@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URL),
    RecipeModule,
    GroupModule,
    IngredientModule,
    UserModule,
    NotificationsModule,
    AuthModule,
    FavoritesModule,
    ShoppingListModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
