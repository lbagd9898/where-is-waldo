#!/bin/bash
kill -9 $(lsof -t -i :3000) 2>/dev/null
kill -9 $(lsof -t -i :5173) 2>/dev/null
npm run dev --prefix client &
node server/app.js &