import Handlebars from "handlebars";

interface ITemplateVariable {
  [key: string]: string | number;
}

interface IParseEmailTemplate {
  template: string;
  variables: ITemplateVariable;
}

export default class HandlebarsMailTemplate {
  public async parse({template, variables}: IParseEmailTemplate): Promise<string> {
    const parseTemplate = Handlebars.compile(template);

    return parseTemplate(variables);
  }
}
