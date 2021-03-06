/// <reference types="fib-rpc" />
/// <reference types="fib-pool" />
/// <reference types="@fibjs/types" />
/// <reference types="fib-session" />
import type { FxOrmModel } from '@fxjs/orm/typings/Typo/model';
import type { FxOrmNS, FxSqlQuerySubQuery } from '@fxjs/orm/typings/Typo/ORM';
import type { FxOrmQuery } from '@fxjs/orm/typings/Typo/query';
import type { FxOrmInstance } from '@fxjs/orm/typings/Typo/instance';
import type { FibAppACL } from './acl';
import { FxOrmHook } from '@fxjs/orm/typings/Typo/hook';
import { FibAppTest } from './test';
export declare namespace FibApp {
    type AppIdType = number | string;
    type UidType = AppIdType;
    type UserRoleName = string;
    interface FibAppSession {
        id?: AppIdType;
        roles?: UserRoleName[];
    }
    interface FibAppSuccessResponse {
        status?: number;
        success: any;
    }
    interface FibAppErrorResponse {
        status?: number;
        error: any;
    }
    interface FibAppResponse<SDT = any> {
        status?: number;
        success?: SDT;
        error?: FibAppFinalError;
    }
    type FibAppApiFunctionResponse<DT = any> = FibAppResponse<DT>;
    type FibAppModelFunctionResponse<DT = any> = FibAppResponse<{
        data: DT;
        message: string;
    }>;
    type FibAppModelViewServiceCallbackResponse<DT = any> = FibAppResponse<DT>;
    type FibAppModelViewFunctionResponse = FibAppResponse<string>;
    interface FibAppFinalError {
        code: number | string;
        name?: string;
        message: string;
        [extendProperty: string]: any;
    }
    interface ObjectWithIdField {
        id: AppIdType;
        [extraProp: string]: any;
    }
    type IdPayloadVar = ObjectWithIdField | AppIdType;
}
export declare namespace FibApp {
    type ReqWhere = FxOrmQuery.QueryConditions;
    type ReqWhereExists = FxOrmQuery.ChainWhereExistsInfo[];
    interface ReqFindByItem {
        extend: string;
        on?: FxSqlQuerySubQuery.SubQueryConditions;
        where?: FxSqlQuerySubQuery.SubQueryConditions;
        options?: FxOrmModel.ModelOptions__Findby;
    }
    interface FilteredFindByInfo<T = any> {
        accessor: string;
        conditions: FxSqlQuerySubQuery.SubQueryConditions;
        accessor_payload: FxOrmQuery.IChainFind | FxOrmModel.Model;
    }
}
export declare namespace FibApp {
    interface FibAppOrmModelFunction {
        (req: FibAppReq, data: FibAppReqData): FibAppModelFunctionResponse;
    }
    interface FibAppOrmModelViewFunctionRequestInfo {
        base: string;
        id: AppIdType;
        extend: string;
        ext_id: AppIdType;
    }
    interface FibAppOrmModelViewFunction {
        (result: null | FibAppApiFunctionResponse, req: FibAppReq, modelViewFunctionInfo: FibAppOrmModelViewFunctionRequestInfo): FibAppModelViewFunctionResponse;
    }
    interface FibAppOrmModelFunctionHash {
        [fnName: string]: FibAppOrmModelFunction;
    }
    interface FibAppOrmModelViewFunctionDefOptions {
        static?: boolean;
        handler: FibAppOrmModelViewFunction;
        response_headers?: object;
    }
    type FibAppOrmModelViewFunctionDefinition = FibAppOrmModelViewFunction | FibAppOrmModelViewFunctionDefOptions;
    interface FibAppOrmModelViewFunctionHash {
        get?: FibAppOrmModelViewFunctionDefinition;
        find?: FibAppOrmModelViewFunctionDefinition;
        eget?: FibAppOrmModelViewFunctionDefinition;
        efind?: FibAppOrmModelViewFunctionDefinition;
        [fnName: string]: FibAppOrmModelViewFunctionDefinition;
    }
    interface FibAppOrmModelViewServiceCallback {
        (req: FibAppReq, data: FibAppReqData): FibAppModelFunctionResponse;
    }
    interface FibAppOrmModelViewServiceHash {
        [fnName: string]: FibAppOrmModelViewServiceCallback;
    }
    interface FibAppOrmInstance extends FxOrmNS.Instance {
        acl: FibAppACL.ACLDefinition;
        oacl: FibAppACL.OACLDefinition;
    }
    interface AppSpecialDateProperty extends FxOrmNS.ModelPropertyDefinition {
        type: 'date';
        time?: true;
    }
    interface OrigORMDefProperties {
        createdAt?: AppSpecialDateProperty;
        updatedAt?: AppSpecialDateProperty;
        [key: string]: FxOrmNS.OrigModelPropertyDefinition;
    }
    interface FibAppOrmModelDefOptions extends FxOrmNS.ModelOptions {
        webx?: {
            ACL?: FibAppACL.FibACLDef;
            OACL?: FibAppACL.FibOACLDef;
            functions?: FibAppOrmModelFunctionHash;
            viewFunctions?: FibAppOrmModelViewFunctionHash;
            viewServices?: FibAppOrmModelViewServiceHash;
            no_graphql?: boolean;
            rpc?: FibRpcInvoke.FibRpcFnHash;
        };
    }
    interface ExtendModelWrapper {
        type: 'hasOne' | 'hasMany' | 'extendsTo';
        reversed?: boolean;
        model: FibApp.FibAppORMModel;
        assoc_model: FibApp.FibAppORMModel;
    }
    /**
     * @deprecated
     */
    interface FibAppFixedOrmExtendModelWrapper extends ExtendModelWrapper {
        model_associated_models: {
            [modelName: string]: FibAppORMModel;
        };
    }
    /**
     * @deprecated
     */
    interface FibAppOrmModelExtendsInfoHash {
        [ext_name: string]: FibAppFixedOrmExtendModelWrapper;
    }
    type FibAppOrmModelExtendsInfo = FibAppOrmModelExtendsInfoHash;
    interface FibAppORMModel extends FxOrmNS.Model {
        $webx: {
            cid: number;
            model_name: string;
            ACL: FibAppACL.FibACLDef;
            OACL: FibAppACL.FibOACLDef;
            functions: FibAppOrmModelFunctionHash;
            viewFunctions: FibAppOrmModelViewFunctionHash;
            viewServices: FibAppOrmModelViewServiceHash;
            no_graphql: boolean;
            rpc: FibRpcInvoke.FibRpcFnHash;
        };
        readonly cid: FibAppORMModel['$webx']['cid'];
        readonly model_name: FibAppORMModel['$webx']['model_name'];
        readonly ACL: FibAppORMModel['$webx']['ACL'];
        readonly OACL: FibAppORMModel['$webx']['OACL'];
        readonly functions: FibAppORMModel['$webx']['functions'];
        readonly viewFunctions: FibAppORMModel['$webx']['viewFunctions'];
        readonly viewServices: FibAppORMModel['$webx']['viewServices'];
        readonly no_graphql: FibAppORMModel['$webx']['no_graphql'];
    }
    interface FibAppOrmSettings {
        'app.orm.common_fields.createdBy': string;
        'app.orm.common_fields.createdAt': string;
        'app.orm.common_fields.updatedAt': string;
        [extend_property: string]: any;
    }
}
export declare namespace FibApp {
    type FibModelCountTypeMACRO = number;
    type FibAppModelExtendORMFuncName = string;
    interface FibAppOrmDefineFn {
        (db: FibAppORM): void | FibAppORMModel | any;
    }
    interface AppORMPool<T1> extends FibPoolNS.FibPool<T1> {
        app: FibAppClass;
        use(defs?: FibAppOrmDefineFn | FibAppOrmDefineFn[], opts?: {
            reload?: boolean;
        }): FibAppOrmDefineFn[];
    }
    type AppDBPool<T1> = AppORMPool<T1>;
    interface GraphQLResolverArgs {
        [k: string]: {
            type: Function;
        };
    }
    interface FibAppApiCommnPayload_hasManyArgs extends GraphQLResolverArgs {
        where: {
            type: Function;
        };
        join_where: {
            type: Function;
        };
        findby: {
            type: Function;
        };
        skip: {
            type: Function;
        };
        limit: {
            type: Function;
        };
        order: {
            type: Function;
        };
    }
    interface FibAppGraphQlPayload_Field {
        [field: string]: {
            type: string;
            args?: FibAppApiCommnPayload_hasManyArgs;
            resolve: any;
        };
    }
    interface FibDataPayload {
        [key: string]: any;
    }
    interface FibAppFilterableViewFunction {
        (req: FibAppReq, db: FibAppORM, cls: null | FibAppORMModel, data: FibAppReqData): FibAppApiFunctionResponse | string;
    }
    interface FibAppFilterableApiFunction__NullModel {
        (req: FibAppReq, db: FibAppORM, cls: null, data: FibAppReqData): FibAppApiFunctionResponse;
    }
    interface FibAppFilterableApiFunction__WithModel {
        (req: FibAppReq, db: FibAppORM, cls: FibAppORMModel, data: FibAppReqData): FibAppApiFunctionResponse;
    }
    interface FibAppInternalTypedApi__Get<RT = any> {
        (req: FibAppReq, db: FibAppORM, cls: FxOrmNS.Model, id: AppIdType): RT;
    }
    type FibAppIneternalApiFunction__Get = FibAppInternalTypedApi__Get<FibAppApiFunctionResponse>;
    interface FibAppIneternalApiFunction__Post {
        (req: FibAppReq, db: FibAppORM, cls: FxOrmNS.Model, data: FibAppReqData): FibAppApiFunctionResponse;
    }
    interface FibAppInternalTypedApi__Find<RT = any> {
        (req: FibAppReq, db: FibAppORM, cls: FxOrmNS.Model): RT;
    }
    type FibAppIneternalApiFunction__Find = FibAppInternalTypedApi__Find<FibAppApiFunctionResponse>;
    interface FibAppIneternalApiFunction__Put {
        (req: FibAppReq, db: FibAppORM, cls: FxOrmNS.Model, id: AppIdType | FxOrmInstance.Instance, data: FibAppReqData): FibAppApiFunctionResponse;
    }
    interface FibAppIneternalApiFunction__Del {
        (req: FibAppReq, db: FibAppORM, cls: FxOrmNS.Model, id: AppIdType | FxOrmInstance.Instance): FibAppApiFunctionResponse;
    }
    interface FibAppInternalTypedApi__Eget<RT = any> {
        (req: FibAppReq, db: FibAppORM, cls: FxOrmNS.Model, id: AppIdType | FxOrmInstance.Instance, extend: FibAppACL.ACLExtendModelNameType, rid?: AppIdType): RT;
    }
    type FibAppIneternalApiFunction__Eget = FibAppInternalTypedApi__Eget<FibAppApiFunctionResponse>;
    interface FibAppInternalTypedApi__Efind<RT = any> {
        (req: FibAppReq, db: FibAppORM, cls: FxOrmNS.Model, id: AppIdType | FxOrmInstance.Instance, extend: FibAppACL.ACLExtendModelNameType): RT;
    }
    type FibAppIneternalApiFunction__Efind = FibAppInternalTypedApi__Efind<FibAppApiFunctionResponse>;
    interface FibAppIneternalApiFunction__Epost {
        (req: FibAppReq, db: FibAppORM, cls: FxOrmNS.Model, id: AppIdType | FxOrmInstance.Instance, extend: FibAppACL.ACLExtendModelNameType, data: FibApp.IdPayloadVar | FibDataPayload): FibAppApiFunctionResponse;
    }
    interface FibAppIneternalApiFunction__Eput {
        (req: FibAppReq, db: FibAppORM, cls: FxOrmNS.Model, id: AppIdType | FxOrmInstance.Instance, extend: FibAppACL.ACLExtendModelNameType, rid: AppIdType, data: FibDataPayload): FibAppApiFunctionResponse;
    }
    interface FibAppIneternalApiFunction__Edel {
        (req: FibAppReq, db: FibAppORM, cls: FxOrmNS.Model, id: AppIdType | FxOrmInstance.Instance, extend: FibAppACL.ACLExtendModelNameType, rid: AppIdType): FibAppApiFunctionResponse;
    }
    interface FibAppIneternalApiFunction__Elink {
        (req: FibAppReq, db: FibAppORM, cls: FxOrmNS.Model, id: AppIdType | FxOrmInstance.Instance, extend: FibAppACL.ACLExtendModelNameType, data: FibDataPayload): FibAppApiFunctionResponse;
    }
    interface FibAppInternalApis {
        get?: FibAppIneternalApiFunction__Get;
        post?: FibAppIneternalApiFunction__Post;
        find?: FibAppIneternalApiFunction__Find;
        put?: FibAppIneternalApiFunction__Put;
        del?: FibAppIneternalApiFunction__Del;
        eget?: FibAppIneternalApiFunction__Eget;
        efind?: FibAppIneternalApiFunction__Efind;
        epost?: FibAppIneternalApiFunction__Epost;
        eput?: FibAppIneternalApiFunction__Eput;
        edel?: FibAppIneternalApiFunction__Edel;
        elink?: FibAppIneternalApiFunction__Elink;
        functionHandler?: {
            (classname: string, func: string): {
                (_req: FibAppReq, db: FibAppORM, cls: FibAppORMModel, data: FibDataPayload): FibAppModelFunctionResponse;
            };
        };
    }
    interface FibAppIneternalApiFindResult<ReponseT = any> {
        count: number;
        results: ReponseT[];
    }
    interface FibAppInternalViewApis {
        get?: FibAppInternalTypedApi__Get<FibAppModelViewFunctionResponse>;
        find?: FibAppInternalTypedApi__Find<FibAppModelViewFunctionResponse>;
        eget?: FibAppInternalTypedApi__Eget<FibAppModelViewFunctionResponse>;
        efind?: FibAppInternalTypedApi__Efind<FibAppModelViewFunctionResponse>;
    }
    interface FibAppModelViewServiceApis {
        [view_service_api: string]: FibAppOrmModelViewServiceHash;
    }
    type FibAppHttpApiCollectionType = FibAppInternalApis | FibAppInternalViewApis;
    interface AppInternalCommunicationObj {
        inst?: FxOrmNS.Instance | null;
        acl?: FibAppACL.RoleActDescriptor;
        error?: FibAppFinalError;
    }
    interface AppInternalCommunicationError {
        error: FibAppFinalError;
    }
    type FibAppInternalCommObj = AppInternalCommunicationObj;
    interface AppInternalCommunicationExtendObj extends AppInternalCommunicationObj {
        base?: FxOrmNS.Instance;
    }
    type FibAppInternalCommExtendObj = AppInternalCommunicationExtendObj;
    type GraphQLQueryString = string;
    interface FibAppORM extends FxOrmNS.ORM {
        app: FibAppClass;
        models: {
            [key: string]: FibAppORMModel;
        };
        graphql<T = any>(query: FibApp.GraphQLQueryString, req: FibApp.FibAppHttpRequest): T;
        define(name: string, properties: FxOrmModel.ModelPropertyDefinitionHash, opts?: FibAppOrmModelDefOptions): FibAppORMModel;
    }
    type FibAppDb = FibAppORM;
    type FibAppFunctionToBeFilter = (FibAppFilterableApiFunction__WithModel | FibAppFilterableApiFunction__NullModel | FibAppOrmModelFunction | FibAppInternalApiFunction);
    type FibAppInternalApiFunction = FibAppIneternalApiFunction__Get | FibAppIneternalApiFunction__Find | FibAppIneternalApiFunction__Post | FibAppIneternalApiFunction__Put | FibAppIneternalApiFunction__Del | FibAppIneternalApiFunction__Eget | FibAppIneternalApiFunction__Efind | FibAppIneternalApiFunction__Epost | FibAppIneternalApiFunction__Eput | FibAppIneternalApiFunction__Edel | FibAppIneternalApiFunction__Elink;
    type FibAppSetupChainFn = FibApp.FibAppClass['filterRequest'];
    interface FibAppHookBeforeResponse {
        (req: FibAppReq, responseObj: FibAppResponse): void;
    }
    interface FibAppHttpRequest extends Class_HttpRequest, FibSessionNS.HttpRequest {
        error?: FibAppFinalError;
        session: FibApp.FibAppSession;
        id?: FibRpcJsonRpcSpec.JsonRpcId;
        [k: string]: any;
    }
    interface FibAppReqQuery {
        where?: string | FibApp.ReqWhere;
        join_where?: FibApp.ReqWhere;
        findby?: FibApp.ReqFindByItem;
        keys?: string | string[];
        skip?: number;
        limit?: number;
        order?: string;
        /**
         * it's numberType, but it's designed as boolean like count_required
         * @history this is mostly for arg from http get url like
         *
         * // from http
         * `http://localhost:8080/api/user?count=1`
         */
        count?: number;
        /**
         * // from http
         * `http://localhost:8080/api/user?count_required=1&skip=10` -> `count_required = true`
         * `http://localhost:8080/api/user?count_required=0&skip=10` -> `count_required = true`
         * `http://localhost:8080/api/user?count_required=&skip=10` -> `count_required = false`
         */
        count_required?: boolean;
        [extraField: string]: any;
    }
    interface FibAppReqQueryObject extends FibAppReqQuery, Class__object {
    }
    interface FibAppReq {
        session: FibAppSession;
        query: FibAppReqQuery;
        request?: FibAppHttpRequest;
        error?: FibAppFinalError;
        req_resource_type?: FibAppReqResourceType;
        req_resource_handler_type?: FibAppReqResourceHandlerType;
        req_resource_basecls?: string;
        req_resource_extend?: string;
        response_headers?: object;
    }
    type FibAppReqResourceType = 'unknown' | 'json' | 'html' | 'css' | 'js';
    type FibAppReqResourceHandlerType = 'unknown' | 'graphql' | 'builtInBaseRest' | 'builtInBaseRest' | 'builtInExtRest' | 'builtInExtRest' | 'modelFunction' | 'ModelFunction';
    interface FibAppReqData {
        [key: string]: any;
    }
    interface FibAppWebApiFunctionInModel {
        (requstInfo: FibAppReq, data: FibAppReqData): any;
    }
    interface FibAppGraphQLTypeMap {
        [typeName: string]: any;
    }
    interface FibAppDbSetupOpts {
        uuid?: boolean;
        maxsize?: number;
        timeout?: number;
        retry?: boolean;
    }
    interface FibAppOpts {
        graphqlTypeMap?: FibAppGraphQLTypeMap;
        /**
         * @default '/'
         */
        apiPathPrefix?: string;
        /**
         * @default '/'
         */
        viewPathPrefix?: string;
        /**
         * @default '/'
         */
        graphQLPathPrefix?: string;
        /**
         * @default '/'
         * @recommended '/'
         */
        batchPathPrefix?: string;
        /**
         * @notice cannot be '/'
         * @default '/rpc'
         */
        rpcPathPrefix?: string;
        /**
         * @notice cannot be '/'
         * @default '/websocket'
         */
        websocketPathPrefix?: string;
        hooks?: Hooks;
        hideErrorStack?: boolean;
    }
    interface WebSocketMessageHandlerContext<DT = any> {
        app: FibApp.FibAppClass;
        data: DT;
        /**
         * @description
         */
        websocket_msg: Class_WebSocketMessage;
        /**
         * @description websocket connection
         */
        websocket: Class_WebSocket;
        /**
         * @description websocket's original request
         */
        request: FibApp.FibAppHttpRequest;
    }
    interface Hooks {
        beforeSetupRoute?: FxOrmHook.HookActionCallback;
    }
    interface GetTestRoutingOptions {
        initRouting?: {
            (routing: {
                [k: string]: Function;
            }): void;
        };
    }
    interface GetTestServerOptions extends GetTestRoutingOptions {
        port?: number;
    }
    interface SessionTestServerInfo {
        app: FibAppClass;
        server: Class_HttpServer;
        routing: Class_Routing;
        port: number;
        httpHost: string;
        websocketHost: string;
        /**
         * @alias httpHost
         */
        serverBase: string;
        appUrlBase: string;
        utils: {
            sessionAs: {
                (sessionInfo: FibAppSession): void;
            };
        };
    }
    interface FibAppClassTestUtils {
        mountAppToSessionServer: {
            (app: FibAppClass, opts: GetTestServerOptions): SessionTestServerInfo;
        };
        getRestClient: (opts: FibAppTest.FibAppTestClientOptions) => FibAppTest.FibAppTestHttpClient;
        internalApiResultAssert: {
            ok: (result: FibAppApiFunctionResponse) => void;
            fail: (result: FibAppApiFunctionResponse) => void;
        };
    }
    interface FibAppClassUtils {
        transform_fieldslist_2_graphql_inner_string(arr: any[]): string;
        readonly isDebug: boolean;
    }
    interface RpcMethod extends FibRpcInvoke.JsonRpcInvokedFunction {
        (params: Fibjs.AnyObject & {
            $session: FibApp.FibAppSession;
            $request: FibApp.FibAppReq;
        }): any;
    }
    class FibAppClass extends Class_Routing {
        api: FibAppInternalApis;
        viewApi: FibAppInternalViewApis;
        ormPool: AppORMPool<FibAppORM>;
        readonly dbPool: AppORMPool<FibAppORM>;
        readonly db: AppORMPool<FibAppORM>;
        readonly rpcCall: {
            <TS = any, TERR = any>(req: FibRpcJsonRpcSpec.RequestPayload | FibApp.FibAppHttpRequest, opts?: {
                sessionid?: FibApp.FibAppHttpRequest['sessionid'];
                session?: FibApp.FibAppHttpRequest['session'];
            }): TS | FibRpc.FibRpcError<TERR>;
        };
        readonly eventor: Class_EventEmitter;
        addRpcMethod(name: string, fn: RpcMethod): number;
        hasRpcMethod(name: string): boolean;
        removeRpcMethod(name: string): number;
        allRpcMethodNames(): string[];
        clearRpcMethods(): void;
        diagram: () => any;
        filterRequest: {
            (origReq: FibAppHttpRequest, classname: string, func: FibAppFilterableApiFunction__WithModel): void;
            (origReq: FibAppHttpRequest, classname: string, func: FibAppFilterableApiFunction__NullModel): void;
            (origReq: FibAppHttpRequest, classname: string, id: AppIdType, func: FibAppInternalApiFunction): void;
            (origReq: FibAppHttpRequest, classname: string, id: AppIdType, extend: string, efunc: FibAppInternalApiFunction): void;
            (origReq: FibAppHttpRequest, classname: string, id: AppIdType, extend: string, rid: AppIdType, efunc: FibAppInternalApiFunction): void;
            (origReq: FibAppHttpRequest, classname: string, func: FibAppFilterableViewFunction): void;
        };
        test: FibAppClassTestUtils;
        utils: FibAppClassUtils;
        readonly __opts: FibAppOpts;
        constructor(connStr: string);
        constructor(connStr: string, opts: FibAppDbSetupOpts);
        constructor(connStr: string, appOpts: FibAppOpts, opts: FibAppDbSetupOpts);
        /**
         * fix lack of
         *  [METHOD](pattern: string, ...args: any[]): Class_Routing
         * in 'fib-types'
         */
        all(pattern: string | object, ...args: any[]): Class_Routing;
        get(pattern: string | object, ...args: any[]): Class_Routing;
        post(pattern: string | object, ...args: any[]): Class_Routing;
        del(pattern: string | object, ...args: any[]): Class_Routing;
        put(pattern: string | object, ...args: any[]): Class_Routing;
        patch(pattern: string | object, ...args: any[]): Class_Routing;
        find(pattern: string | object, ...args: any[]): Class_Routing;
    }
    type FibAppOnTypeString = 'graphql:fix-orm-type';
}
