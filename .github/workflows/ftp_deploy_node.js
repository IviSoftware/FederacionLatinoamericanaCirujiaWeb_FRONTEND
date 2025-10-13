const FtpDeploy = require("ftp-deploy");
const ftpDeploy = new FtpDeploy();

const staging_ftp_server   = process.env.staging_ftp_server;
const staging_ftp_username = process.env.staging_ftp_username;
const staging_ftp_password = process.env.staging_ftp_password;

const path = require("path");
// Si BUILD_DIR está definida, se usa para ubicar la versión construida del proyecto; 
// de lo contrario se usa la ruta por defecto (se asume "desarrollo")
const buildDir = process.env.BUILD_DIR 
  ? path.resolve(__dirname, "../../", process.env.BUILD_DIR)
  : path.resolve(__dirname, "../../desarrollo");

const config = {
  user: staging_ftp_username,
  password: staging_ftp_password,
  host: staging_ftp_server,
  port: 21,
  localRoot: buildDir,
  remoteRoot: "/",
  include: ["**/*"],
  deleteRemote: false,
  forcePasv: true
};

ftpDeploy.on("upload-error", (data) => {
  console.error("Error en subida:", data);
});

ftpDeploy.deploy(config)
  .then(res => {
    console.log("Deployment finished:", res);
    process.exit(0);
  })
  .catch(err => {
    console.error("Deployment error:", err);
    process.exit(1);
  });
