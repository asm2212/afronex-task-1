import { CamelCaseOptions } from './utilities';
type StyleObject = Record<string, string>;
interface StyleToJSOptions extends CamelCaseOptions {
}
/**
 * Parses CSS inline style to JavaScript object (camelCased).
 */
export default function StyleToJS(style: string, options?: StyleToJSOptions): StyleObject;
export {};
//# sourceMappingURL=index.d.ts.map