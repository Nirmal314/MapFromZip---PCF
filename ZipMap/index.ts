import { IInputs, IOutputs } from "./generated/ManifestTypes";
import Map from "./Map";
import * as React from "react";

// context.parameters.zipCode.raw!

// type GeoLocation = {
//   latitude: number;
//   longitude: number;
// };
type ZipCodeProps = {
  zipCode: number;
};

export class MapFromZip
  implements ComponentFramework.ReactControl<IInputs, IOutputs>
{
  private theComponent: ComponentFramework.ReactControl<IInputs, IOutputs>;
  private notifyOutputChanged: () => void;
  private zipCode: ZipCodeProps;

  constructor() {}
  public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
    state: ComponentFramework.Dictionary
  ): void {
    this.notifyOutputChanged = notifyOutputChanged;
  }

  public updateView(
    context: ComponentFramework.Context<IInputs>
  ): React.ReactElement {
    this.zipCode = {
      zipCode: context.parameters.zipCode.raw!,
    };

    return React.createElement(Map, { ...this.zipCode });
  }

  public getOutputs(): IOutputs {
    return {};
  }

  public destroy(): void {}
}
