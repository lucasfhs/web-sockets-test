const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("Novo usuário conectado: ", socket.id);

  socket.on("mensagem", (data) => {
    console.log("Mensagem recebida: ", data);
    io.emit("mensagem", data); // Reenvia a mensagem para todos os clientes
  });

  socket.on("disconnect", () => {
    console.log("Usuário desconectado: ", socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
