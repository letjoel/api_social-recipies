import { Controller, Get, Post, Body, Patch, Param, Delete, Headers, UseGuards, Request  } from '@nestjs/common';
import { ShoppingListService } from './shopping_list.service';
import { UpsertShoppingListDto } from './dto/upsert-shopping_list.dto';
import { UpdateShoppingListDto } from './dto/update-shopping_list.dto';
import { ParseObjectIdPipe } from 'src/utilities/parse-object-id-pipe.pipe';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CompareIdGuard } from 'src/auth/guards/compare-id.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/auth/models/role.enum';

@Controller('shopping-list')
export class ShoppingListController {
  constructor(private readonly shoppingListService: ShoppingListService) {}

  //Pending: only author can do that
  @ApiBearerAuth()
  @Roles(Role.USER, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard, CompareIdGuard)
  @Post()
  async upsertShoppingList(@Body() UpsertShoppingListDto: UpsertShoppingListDto) {
    return this.shoppingListService.upsertShoppingList(UpsertShoppingListDto);
  }

  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async findAll() {
    return this.shoppingListService.findAll();
  }

  //Pending: only author can do that
  @ApiBearerAuth()
  @Roles(Role.USER, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  async findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.shoppingListService.findOne(id);
  }

  //Pending: only author can do that
  @ApiBearerAuth()
  @Roles(Role.USER, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateShoppingListDto: UpdateShoppingListDto) {
    return this.shoppingListService.update(Number(id), updateShoppingListDto);
  }

  //Pending: only author can do that
  @ApiBearerAuth()
  @Roles(Role.USER, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.shoppingListService.remove(Number(id));
  }
}
