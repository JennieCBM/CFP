# Control Finances APP
```
El proyecto se encuentra en mantenimiento y actualmente no esta en producción.
```
## Funcionalidad General:
- Ver Balance de operaciones de ingresos y egresos de dinero. 
- Añadir registros, borrarlos y editarlos.

## Estructura:

### Cliente: 
  ### My Records (Home) 
   ###### Contenido:
  - Balance de ingresos y egresos de dinero.
  
  - Una Tabla con los ultimos diez datos ingresados descritos en las siguientes columnas:
    - Tipo de operación (Debito o credito);
    - Fecha y hora de creacion de la operacion;
    - Detalles de la operacion.
    - Monto de la operacion.
  
  - Boton para agregar una nueva operacion:
    Al hacer click en la tarjeta superior derecha se despliega un modal con un formulario para agregar los datos requeridos - *Details, Amount y Type* - posteriormente al hacer click en el icono de check :ballot_box_with_check: se realiza una peticion de tipo POST a la API, la cual procesa el llamado e impacta el cambio en la base de datos, mientras tanto, el cliente cambia el estado haciendo un re-render del componente, lo cual dispara nuevamente una llamada de tipo GET a la API para obtener todos los datos de la lista, los cuales son filtrados mediante un metodo slice dando como resultado una lista de las 10 ultimas operaciones incluyendo el nuevo dato.
  
  ### All my Operations
   ###### Contenido:
  
  - Dos tablas, una operaciones de tipo Credito y una de operaciones de tipo Debito.
  - Cada Tabla contiene: 
    - Fecha y hora de creacion de la operacion; 
    - Detalles de la operacion; 
    - Monto de la operacion;
    - Boton para editar la operacion: Al hacer click en dicho boton :pencil: se despliega un modal con un formulario para agregar los datos requeridos - *Details, Amount* - posteriormente al hacer click en el icono de check :ballot_box_with_check: se realiza una peticion de tipo PUT a la API, la cual procesa el llamado e impacta el cambio en la base de datos, mientras tanto, el cliente cambia el estado haciendo un re-render del componente, lo cual dispara nuevamente una llamada de tipo GET a la API para obtener todos los datos de la lista, dando como resultado las dos tablas de operaciones incluyendo la actualizacion del dato.
    - Boton para eliminar la operacion: Al hacer click en dicho boton 🗑️ se despliega un modal de confirmacion -*Are you shure you want to delete this record?*-, al hacer click en el boton -*Yes*- se realiza una peticion de tipo DELETE a la API, la cual procesa el llamado e impacta el cambio en la base de datos, mientras tanto, el cliente cambia el estado haciendo un re-render del componente, lo cual dispara nuevamente una llamada de tipo GET a la API para obtener todos los datos de la lista, dando como resultado las dos tablas de operaciones sin el dato que ha sido eliminado. 
    - Funcionalidad de Zoom: Al hacer click en cualquier parte de las filas (excepto los botones de eliminar o editar) se despliega un modal con los datos de la operacion en detalle. 
    
### Servidor (API):
  ###### Rutas:
  **1. Peticion de tipo GET;**
  ```
    '/operations'
  ```
   - **Response:** 
     - **HTTP Status code:** 200.
     - **Response:** Objeto Json con todos los elementos de la tabla *operations* en orden de creacion.
   - **Requerimientos:** No.
  
  **2. Peticion de tipo POST;**
  ```
  '/add/:type'
  ```
   - **Response:** 
     - **HTTP Status code:** 201.
     - **Response:** *Operation is created!*.
   - **Requerimientos:**
      - **Parametros en la ruta:** Nombre de Tabla: -*operations*-.
      - **En el cuerpo de la peticion:** un objeto Json con los siguientes datos: 
        - Amount (monto),
        - Details (detalles),
        - Email (correo electronico),
        - Type (tipo: debito o credito).           
   
   **3. Peticion de tipo PUT;**
   ```
   './update/:id'
   ``` 
   - **Response:** 
     - **HTTP Status code:** 200.
     - **Response:** *Operation updated!*.
   - **Requerimientos:**
      - **Parametros en la ruta:** ID del elemento.
      - **En el cuerpo de la peticion:** un objeto Json con los siguientes datos: 
        - Amount (monto),
        - Details (detalles).         
    
   **4. Peticion de tipo DELETE;**
   ```
   './delete/:id'
   ```
   - **Response:** 
     - **HTTP Status code:** 200.
     - **Response:** *Operation is deleted!*.
   - **Requerimientos:**
      - **Parametros en la ruta:** ID del elemento. 

## Tecnologias:

- **Cliente:** React.js - React-Router - Reactstrap - FetchApi. 
- **Servidor:** Node.js - Express.js. 
- **Base de Datos:** MySQL. 

## Instalación:

1. En el Servidor debes crear el archivo `.env`
con los datos correspondientes a la base de datos. 

2. Desde la terminal, usa el siguiente comando:
  ```
  npm i 
  ```
Éste recibe las dependencias desde el `package.json`
 tanto en cliente como en servidor. 

