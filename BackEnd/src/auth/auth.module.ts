// backend/src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { FirebaseAuthGuard } from './firebase-auth.guard';

@Module({
  providers: [FirebaseAuthGuard],
  exports: [FirebaseAuthGuard], // agar bisa dipakai di controller lain
})
export class AuthModule {}
