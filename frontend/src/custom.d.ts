// src/custom.d.ts もしくは src/types/index.d.ts
declare module '*.svg' {
    const content: React.FC<React.SVGProps<SVGElement>>;
    export default content;
  }