const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');


const app = express();

/* ---------- Middleware ---------- */
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

const corsOptions = {
  origin: '*',
  methods: 'GET,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Accept, Authorization, Content-Type, X-Requested-With, Range, utc-date',
  credentials: true,
  exposedHeaders: 'Content-Length',
  maxAge: 3600,
};

app.use(cors(corsOptions));


/* ---------- Routes ---------- */
app.use('/api/v1/users', userRoutes);


/* ---------- Start Server ---------- */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Worker ${process.pid} listening on port ${PORT}`);
});
