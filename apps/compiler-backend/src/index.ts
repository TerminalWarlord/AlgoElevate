import fs from "fs";
import express from 'express';
import Docker from 'dockerode';
import { tmpNameSync } from 'tmp-promise';
import { getFileExtension, containerLogs } from "./utils/helper";
import cors from "cors"

const docker = new Docker();
const app = express();
app.use(express.json());

app.use(cors());

// Language configuration
const IMAGE_MAP = {
  cpp: 'compiler',
  python: 'compiler',
  rust: 'compiler'
};

app.post('/execute/:language', async (req, res) => {
  const { code, stdin = '' } = req.body;
  const language = req.params.language as keyof typeof IMAGE_MAP;
  
  // Declare variables outside try block for finally access
  let codeFile = '';
  let stdinFile = '';

  try {
    // Create temp files
    codeFile = tmpNameSync({ postfix: getFileExtension(language) });
    stdinFile = tmpNameSync();
    
    // Use fs.promises for async/await compatibility
    await Promise.all([
      fs.promises.writeFile(codeFile, code),
      fs.promises.writeFile(stdinFile, stdin)
    ]);

    // Docker container configuration
    const container = await docker.createContainer({
      Image: IMAGE_MAP[language],
      Cmd: buildCommand(language, codeFile),
      HostConfig: {
        AutoRemove: true,
        Memory: 100 * 1024 * 1024,
        NetworkMode: 'none',
        Binds: [
          `${codeFile}:/app/code${getFileExtension(language)}:ro`,
          `${stdinFile}:/app/input.txt:ro`
        ]
      }
    });

    await container.start();
    const output = await containerLogs(container);
    
    res.json({ success: true, output: output.replace(/[\x00-\x08\x0B-\x1F]/g, '') });
  } catch (error) {
    // Proper error type handling
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorLogs = (error as any).logs || 'No logs available';

    res.status(500).json({ 
      success: false, 
      error: errorMessage,
      logs: errorLogs 
    });
  } finally {
    // Cleanup temp files with proper error handling
    await Promise.allSettled([
      codeFile ? fs.promises.unlink(codeFile).catch(() => {}) : Promise.resolve(),
      stdinFile ? fs.promises.unlink(stdinFile).catch(() => {}) : Promise.resolve()
    ]);
  }
});

function buildCommand(lang: string, codePath: string): string[] {
  switch(lang) {
    case 'cpp':
      return ['sh', '-c', `g++ /app/code.cpp -o /app/out && /app/out < /app/input.txt`];
    case 'python':
      return ['python', '/app/code.py'];
    case 'rust':
      return ['sh', '-c', 'rustc /app/code.rs && /app/code < /app/input.txt'];
    default:
      throw new Error('Unsupported language');
  }
}


app.listen(3002);





