# Database to TypeScript Interface Converter | utility Service

-   This project provides a service to convert database tables into TypeScript interfaces, making it easier to work with database schemas in TypeScript applications.

## Database Support 🔨

-   MySQL
-   PostgreSQL

## Installation

-   to install the package, run the following command:

```bash
npm install database-to-interfaces
```

or if you only use to develop the package, run:

```bash
npm install -D database-to-interfaces
```

### Usage

-   To use the service, you need to initialize the modules with your database connection properties and then call the conversion function. Here's an example:

### Example:

-   this is an example get TypeScript interfaces from a MySQL database and save them to a file:

```typescript
import { convertTablesToTypescriptInterface, initModules, saveInterfaceFile } from 'database-to-interfaces'

DBModuleToUse = initModules(
	'mysql', // or 'postgres' for PostgreSQL
	{
		host: 'localhost',
		port: 3306,
		database: 'test',
		user: 'root',
		password: ''
		//schema: '' //  required for PostgreSQL
	}
)

// returns a  map of table names to their column descriptions
const tablesMap = await DBModuleToUse.getTablesMapWithColumns()

//returns a string with the TypeScript interfaces for the tables
const interfacesString = convertTablesToTypescriptInterface(tablesMap, 'MyDatabase')

// Save the interfaces to a file
await saveInterfaceFile(interfacesString, 'my-database-interfaces.ts')
```

#### example for a output file:

```ts
// updated Sun Jun 01 2025 17:11:17 GMT-0600 (hora estándar central)

export interface json_type {
	[key: string]: any
}

export interface usuarios {
	usuarioid: number
	usuario?: string | null
	pass?: string | null
}
```

you also can get the available modules by calling the `getAvailableModules` function:

```typescript
import { getAvailableModules } from 'database-to-interfaces'
console.log(getAvailableModules())
// Output: ['mysql', 'postgres']
```

## Testing the Connection

-   You can test the connection to the database by calling the `testConnection` method on the database handler. This method returns a promise that resolves to `true` if the connection is successful, or `false` if it fails.

```typescript
const isConnected = await DBModuleToUse.testConnection()
if (isConnected) {
	console.log('Connection successful!')
} else {
	console.log('Connection failed!')
}
```
