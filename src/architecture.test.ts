import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import ts from 'typescript';
import { expect, it } from 'vitest';

it('keeps UI kit dependencies within the kit, React and the icon library', () => {
  const root = resolve('src/ui-kit');
  const files = readdirSync(root).filter(
    (name) => /\.tsx?$/.test(name) && !name.includes('.test.'),
  );
  const invalid: string[] = [];
  for (const name of files) {
    const path = join(root, name);
    const source = ts.createSourceFile(
      path,
      readFileSync(path, 'utf8'),
      ts.ScriptTarget.Latest,
      true,
    );
    for (const statement of source.statements) {
      if (
        !(ts.isImportDeclaration(statement) || ts.isExportDeclaration(statement)) ||
        !statement.moduleSpecifier ||
        !ts.isStringLiteral(statement.moduleSpecifier)
      )
        continue;
      const dependency = statement.moduleSpecifier.text;
      const allowed =
        dependency === 'react' ||
        dependency === 'lucide-react' ||
        (dependency.startsWith('.') && resolve(dirname(path), dependency).startsWith(root + '/'));
      if (!allowed) invalid.push(`${name} → ${dependency}`);
    }
  }
  expect(invalid).toEqual([]);
});
