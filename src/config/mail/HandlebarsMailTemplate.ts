import Handlebars from "handlebars";
import fs from 'fs';

interface ITemplateVariable {
  [key: string]: string | number;
}

interface IParseEmailTemplate {
  file: string;
  variables: ITemplateVariable;
}

export default class HandlebarsMailTemplate {
  public async parse({file, variables}: IParseEmailTemplate): Promise<string> {
    const parseTemplateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });
    const parseTemplate = Handlebars.compile(parseTemplateFileContent);

    return parseTemplate(variables);
  }
}
