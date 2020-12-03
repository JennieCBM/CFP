# Control Finances APP
Proyecto Challenge para aplicar en Alkemy.org.

El proyecto actualemente se encuentra en producción, desde el 02/12/2020 hasta el 15/12/2020.
Ver en Github pages https://jenniecbm.github.io/CFP/#/

### Estructura:

- Cliente: 
  Home: 
  Balance de ingresos y egresos de dinero.
  Ultimos diez datos ingresados descritos en las siguientes columnas:
    Tipo de operación (Debito o credito);
    Fecha y hora de creacion de la operacion;
    Detalles de la operacion.
    Monto.  
    
- Servidor (API):
  Rutas:
  
   #### -.'/operations': 
    
    Peticion de tipo GET;
    
    Response: Todos los elementos en orden de creacion;
    
    Requerimientos: No.
    
   #### -.'/operations-last-10':
    
    Peticion de tipo GET;
    
    Response: Los ultimos diez parametros en orden de creación;
    
    Requerimientos: No;
    
    Nota: el cliente actualmente no consume este EndPonit, sin embargo está disponible.
    
   #### -.'/operations/:id' 
   
   Peticion de tipo GET;
   
   Response: Un item en especifico;
   
   Requerimientos: -
   El id del elemento;
   
   Nota: el cliente actualmente no consume este EndPoint, sin embargo está disponible.
   
   #### -.'/add/:type'
   
   Peticion de tipo POST;
   
   Response - status 201 - operacion/ user creado;
   
   Requerimientos: 
   -Tipo de dato (Operations o User);
   
   -En caso de ser "Operations" el cuerpo de la peticion requiere: amount, details, email y type;
   -En caso de ser "User" el cuerpo de la peticion requiere: email, name y password;
  
    Nota: el cliente actualmente no hace uso de la tabla Users 
    
  #### -.'./update/:id'
     
   Peticion de tipo PUT;
   
   Response -status 200- operacion actualizada;
   
   Requerimientos: 
   -El id del elemento;
   -El cuerpo de la peticion requiere: amount, details;
   
   #### -.'./delete/:id'
     
   Peticion de tipo DELETE;
   
   Response -status 200- operacion eliminada;
   
   Requerimientos: 
   -El id del elemento;    

### Tecnologias:

- Cliente: React.js - React-Router - Reactstrap - FetchApi 
- Servidor: Node.js - Express.js 
- Base de Datos: MySQL 

### Contenido y características
- Ver Balance de operaciones de ingresos y egresos de dinero 
- Añadir registros, borrarlos y editarlos.


## Instalación

En el Servidor debes crear el archivo `.env`
con los datos correspondientes a la base de datos. 

## Instalación de dependencias
Desde la terminal, usa el siguiente comando:

```
npm i 
```

Éste recibe las dependencias desde el `package.json`
 tanto en cliente como en servidor. 

