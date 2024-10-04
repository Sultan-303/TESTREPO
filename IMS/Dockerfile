# Use the official ASP.NET Core runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80

# Use the SDK image to build the app
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["IMS/IMS.csproj", "IMS/"]
RUN dotnet restore "IMS/IMS.csproj"
COPY . .
WORKDIR "/src/IMS"
RUN dotnet build "IMS.csproj" -c Release -o /app/build

# Publish the app
FROM build AS publish
RUN dotnet publish "IMS.csproj" -c Release -o /app/publish

# Final stage, copy the published app to the runtime image
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "IMS.dll"]
