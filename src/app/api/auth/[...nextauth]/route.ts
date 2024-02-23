import bcrypt from 'bcrypt'
import NextAuth, { AuthOptions } from "next-auth";
import { CredentialsProvider } from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter'; 

import prisma from '@/app/libs/prismadb'



