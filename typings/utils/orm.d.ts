import { FxOrmNS } from "@fxjs/orm/typings/Typo/ORM";
import { FibApp } from "../Typo/app";
export declare function default_settings(): FibApp.FibAppOrmSettings;
export declare function set_orm_default_settings(orm: FibApp.FibAppORM): void;
export declare function get_field_createdby(settings: FxOrmNS.SettingInstance): any;
export declare function get_field_createdat(settings: FxOrmNS.SettingInstance): any;
export declare function get_field_updatedat(settings: FxOrmNS.SettingInstance): any;
interface InternalApiInfoSettingOptions {
    data: any;
    req_info?: FibApp.FibAppReq;
    keys_to_left?: string[];
}
export declare function create_instance_for_internal_api(cls: FxOrmNS.Model, options: InternalApiInfoSettingOptions): FxOrmNS.Instance;
export declare function attach_internal_api_requestinfo_to_instance(inst: FxOrmNS.Instance, options: InternalApiInfoSettingOptions): void;
export {};
