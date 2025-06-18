# 🚀 Guia de Migração para Nest.js

## 📋 **Resumo das Mudanças**

Este projeto foi migrado de uma arquitetura Apollo Server standalone para **Nest.js** com GraphQL integrado, mantendo a Clean Architecture existente.

## 🔄 **Principais Alterações**

### **1. Estrutura de Arquivos**

#### **Antes:**

```
src/
├── index.ts                    # Ponto de entrada
├── server.ts                   # Configuração Apollo Server
├── shared/
│   ├── container.ts            # DI manual
│   ├── graphql/schema.ts       # Schema manual
│   └── infra/prisma/client.ts  # Cliente Prisma
└── modules/
    ├── application/            # Casos de uso
    ├── domain/                 # Modelos e repositórios
    ├── infra/                  # Implementações
    └── graphql/                # Resolvers manuais
```

#### **Depois:**

```
src/
├── main.ts                     # Ponto de entrada Nest.js
├── app.module.ts               # Módulo raiz
├── shared/
│   └── prisma/
│       ├── prisma.module.ts    # Módulo Prisma
│       └── prisma.service.ts   # Service Prisma
└── modules/
    └── user/
        ├── user.module.ts              # Módulo do usuário
        ├── domain/
        │   ├── models/user.model.ts    # Modelo de domínio
        │   └── repository/user.repository.ts # Interface do repositório
        ├── application/
        │   ├── register-user.use-case.ts   # Caso de uso de registro
        │   └── login.use-case.ts           # Caso de uso de login
        ├── infra/
        │   └── prisma/user-prisma.repository.ts # Implementação Prisma
        └── graphql/
            ├── user.resolver.ts        # Resolver GraphQL
            ├── dto/                    # DTOs de entrada
            └── types/                  # Tipos GraphQL
```

### **2. Injeção de Dependências**

#### **Antes (Manual):**

```typescript
// container.ts
export const userRepository = new UserPrismaRepository();

// RegisterUser.ts
const userRepository = new UserPrismaRepository();
```

#### **Depois (Nest.js DI):**

```typescript
// user.module.ts
@Module({
  providers: [
    {
      provide: UserRepository,
      useClass: UserPrismaRepository,
    },
    RegisterUserUseCase,
  ],
})
// register-user.use-case.ts
@Injectable()
export class RegisterUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}
}
```

### **3. GraphQL**

#### **Antes (Schema-first manual):**

```typescript
// schema.ts
export const schema = makeExecutableSchema({
  typeDefs: [userAuthTypeDefs],
  resolvers: [userAuthResolvers],
});
```

#### **Depois (Code-first automático):**

```typescript
// app.module.ts
GraphQLModule.forRoot<ApolloDriverConfig>({
  driver: ApolloDriver,
  autoSchemaFile: true, // Schema gerado automaticamente
});

// user.resolver.ts
@Resolver(() => UserType)
export class UserResolver {
  @Mutation(() => UserType)
  async registerUser(@Args('input') input: RegisterUserInput) {
    // ...
  }
}
```

## 🛠️ **Scripts Atualizados**

### **Antes:**

```json
{
  "dev": "nodemon src/index.ts",
  "build": "tsc"
}
```

### **Depois:**

```json
{
  "start:dev": "nest start --watch",
  "build": "nest build",
  "start": "nest start",
  "start:prod": "node dist/main"
}
```

## 🚀 **Como Executar**

### **1. Instalar Dependências**

```bash
npm install
```

### **2. Configurar Banco de Dados**

```bash
npm run generate  # Gerar cliente Prisma
npm run migrate   # Executar migrações
```

### **3. Executar em Desenvolvimento**

```bash
npm run start:dev
```

### **4. Acessar GraphQL Playground**

```
http://localhost:4000/graphql
```

## 📝 **Exemplos de Uso**

### **Registrar Usuário:**

```graphql
mutation RegisterUser($input: RegisterUserInput!) {
  registerUser(input: $input) {
    id
    username
    firstName
    lastName
    email
  }
}

# Variables:
{
  "input": {
    "username": "john_doe",
    "firstName": "John",
    "lastName": "Doe",
    "dateOfBirth": "1990-01-01",
    "email": "john@example.com",
    "password": "123456",
    "confirmPassword": "123456"
  }
}
```

### **Login:**

```graphql
mutation LoginUser($input: LoginUserInput!) {
  loginUser(input: $input) {
    token
    user {
      id
      username
      email
    }
  }
}

# Variables:
{
  "input": {
    "email": "john@example.com",
    "password": "123456"
  }
}
```

### **Listar Usuários:**

```graphql
query GetUsers {
  users {
    id
    username
    firstName
    lastName
    email
  }
}
```

## ✨ **Benefícios da Migração**

1. **DI Nativo**: Sistema robusto de injeção de dependências
2. **Validação Automática**: Com class-validator nos DTOs
3. **Schema Automático**: Geração automática do schema GraphQL
4. **Decorators**: Código mais limpo e expressivo
5. **Testing**: Módulo de testes integrado
6. **Middleware**: Pipeline de middleware robusto
7. **Escalabilidade**: Estrutura preparada para crescer
8. **Comunidade**: Ecossistema rico do Nest.js

## 🔧 **Próximos Passos Sugeridos**

1. **Autenticação**: Implementar Guards JWT
2. **Validação**: Adicionar pipes de validação
3. **Logging**: Implementar interceptors de log
4. **Testes**: Criar testes unitários e e2e
5. **Swagger**: Adicionar documentação REST se necessário
6. **Config**: Implementar @nestjs/config para variáveis de ambiente

## 🚨 **Arquivos Removidos**

- `src/index.ts` → `src/main.ts`
- `src/server.ts` → integrado no `app.module.ts`
- `src/shared/container.ts` → DI nativo do Nest.js
- `src/shared/graphql/schema.ts` → schema automático
- `src/shared/infra/prisma/client.ts` → `PrismaService`
