import Docker from 'dockerode';

export async function containerLogs(container: Docker.Container): Promise<string> {
    try {
        // Get the logs stream from Docker
        const stream = await container.logs({
            follow: true,
            stdout: true,
            stderr: true,
            timestamps: false // Exclude timestamps from output
        });

        return await new Promise((resolve, reject) => {
            let logs = '';

            // Handle stream data
            stream.on('data', (chunk: Buffer) => {
                logs += chunk.toString('utf-8');
            });

            // Handle stream errors
            stream.on('error', (err: Error) => {
                (stream as any).destroy();
                reject(new Error(`Log stream error: ${err.message}`));
            });

            // Handle stream end
            stream.on('end', () => {
                resolve(logs.trim()); // Remove trailing newlines
            });

            // Handle container exit (safety measure)
            setTimeout(() => {
                if (!logs) reject(new Error('No logs received within timeout'));
            }, 5000);
        });
    } catch (err) {
        if (err instanceof Error) {
            throw new Error(`Failed to get container logs: ${err.message}`);
        } else {
            throw new Error('Failed to get container logs: Unknown error');
        }
    } finally {
        // Force cleanup if still running
        try { await container.stop(); } catch { }
    }
}


export function getFileExtension(lang: string): string {
    switch (lang.toLowerCase()) {
        case 'cpp':
            return '.cpp';
        case 'c':
            return '.c';
        case 'python':
            return '.py';
        case 'rust':
            return '.rs';
        case 'java':
            return '.java';
        case 'javascript':
            return '.js';
        default:
            throw new Error(`Unsupported language extension: ${lang}`);
    }
}