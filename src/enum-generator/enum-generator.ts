export class EnumGenerator {
  public static generateEnumString(filePath: string, cssClasses: string[]): string {
    const enumName: string = EnumGenerator.generateEnumNameFromPath(filePath);
    const enumBody = EnumGenerator.generateEnumBody(cssClasses);
    return EnumGenerator.combineEnumNameAndBodyToString(enumName, enumBody);
  }

  public static combineEnumNameAndBodyToString(enumName: string, enumBody: string): string {
    return `export enum ${enumName} ${enumBody}`;
  }

  public static generateEnumNameFromPath(path: string): string {
    const fileName = path.match(/([^\/\\]*)\.(scss|css)$/);
    const enumName = (fileName && fileName[1]) || 'styles';
    const camelCasedName = EnumGenerator.generateCamelCaseName(enumName);
    return camelCasedName.charAt(0).toUpperCase() + camelCasedName.slice(1);
  }

  public static generateEnumBody(cssClasses: string[]): string {
    let enumBody = '{\n';

    cssClasses.forEach((i) => {
      const propName = EnumGenerator.generateCamelCaseName(i);
      const noDotClassName = i.replace(/^\./, '');
      enumBody += `  ${propName} = '${noDotClassName}',\n`;
    });

    enumBody += '}\n';
    return enumBody;
  }

  private static generateCamelCaseName(str: string): string {
    if (!/[-_]/g.test(str)) {
      return str.replace(/^\../, ([, firstLetter]) => firstLetter.toUpperCase());
    }
    return str
      .replace(/(\-){2,}/g, '$1')
      .replace(/(_){2,}/g, '$1')
      .replace(/[\.\-_][a-z]/g, ([, letter]) => letter.toUpperCase());
  }
}
