
const app = require('./src/app');
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log('Welcom to Log Pilot/n');
    
  console.log(`Server running at http://localhost:${PORT}`);
});
