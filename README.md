## Instructions for Running the Application:
### Data Base
#### Install MySQL Data Base
#### Run the following commands using the .NET CLI:
bash
Copy code
dotnet tool install --global dotnet-ef # (if not already installed)\
dotnet ef database update
### Build and Run the Server-Side
#### Run the process coupons-jb-oroj\backend\JwtMySqlBackend\bin\Release\net8.0\JwtMySqlBackend.exe from the project directory.

### Running the Client-Side
#### Execute the command npm-run-build and copy the static files, create a folder named "wwwroot" in the execution path of the backend process, and paste them there.
#### Open a browser and navigate to the address and port where the server is listening, as displayed in the console window.
