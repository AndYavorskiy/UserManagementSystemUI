export class ModelProperties {
    public static propertiesOf = <TObj>(obj: (TObj | undefined) = undefined) => <T extends keyof TObj>(name: T): T => name;
}
