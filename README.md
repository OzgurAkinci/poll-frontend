### poll-frontend

### docker build (project folder)
```bash
docker build . --tag poll-frontend
```

### create poll-frontend-app container
```bash	
docker run -d --name poll-frontend-container -p 81:80 poll-frontend
```
