/**
 * Visual Studio Code 1.84 扩展 API 的类型定义副本
 * 请参阅 https://code.visualstudio.com/api 了解更多信息
 */

import { URI } from "vscode-uri";

enum ExtensionMode {
  /**
   * 扩展正常安装（例如，从市场
   * 或 VSIX）在编辑器中。
   */
  Production = 1,

  /**
   * 启动编辑器时提供了 `--extensionDevelopmentPath` 参数，
   * 扩展正在从此路径运行。
   */
  Development = 2,

  /**
   * 扩展正在从 `--extensionTestsPath` 运行，并且
   * 扩展主机正在运行单元测试。
   */
  Test = 3,
}

export interface ChaiExtensionContext {
  /**
   * 可以添加 disposable 对象的数组。当此
   * 扩展停用时，disposable 对象将被释放。
   *
   * *注意* 异步 dispose 函数不会被等待。
   */
  readonly subscriptions: {
    /**
     * 清理资源的函数。
     */
    dispose(): any;
  }[];

  /**
   * 包含扩展的目录的 uri。
   */
  readonly extensionUri: URI;

  /**
   * 包含扩展的目录的绝对文件路径。{@link TextDocument.uri ExtensionContext.extensionUri.fsPath} 的简写
   * 表示法（与 uri 方案无关）。
   */
  readonly extensionPath: string;

  /**
   * 获取扩展在此工作区的全局环境变量集合，使更改能够
   * 应用到终端环境变量。
   */
  readonly environmentVariableCollection: any;

  /**
   * 获取扩展中包含的资源的绝对路径。
   *
   * *注意* 绝对 uri 可以通过 {@linkcode Uri.joinPath} 和
   * {@linkcode ExtensionContext.extensionUri extensionUri} 构造，例如 `vscode.Uri.joinPath(context.extensionUri, relativePath);`
   *
   * @param relativePath 扩展中包含的资源的相对路径。
   * @returns 资源的绝对路径。
   */
  asAbsolutePath(relativePath: string): string;

  /**
   * 扩展可以存储私有状态的工作空间特定目录的 uri。
   * 目录可能不存在，创建目录由扩展负责。
   * 但是，父目录保证存在。
   * 当没有打开工作区或文件夹时，值为 `undefined`。
   *
   * 使用 {@linkcode StateManager.workspaceState} 或
   * {@linkcode StateManager.globalState} 存储键值数据。
   *
   * @see {@linkcode FileSystem workspace.fs} 了解如何从
   * uri 读取和写入文件和文件夹。
   */
  readonly storageUri: URI | undefined;

  /**
   * 扩展可以存储私有状态的工作空间特定目录的绝对文件路径。
   * 目录在磁盘上可能不存在，创建目录由扩展负责。
   * 但是，父目录保证存在。
   *
   * 使用 {@linkcode StateManager.workspaceState} 或
   * {@linkcode StateManager.globalState} 存储键值数据。
   *
   * @deprecated 请改用 {@link ExtensionContext.storageUri storageUri}。
   */
  readonly storagePath: string | undefined;

  /**
   * 扩展可以存储全局状态的目录的 uri。
   * 目录在磁盘上可能不存在，创建目录由扩展负责。
   * 但是，父目录保证存在。
   *
   * 使用 {@linkcode StateManager.globalState} 存储键值数据。
   *
   * @see {@linkcode FileSystem workspace.fs} 了解如何从
   * uri 读取和写入文件和文件夹。
   */
  readonly globalStorageUri: URI;

  /**
   * 扩展可以存储全局状态的绝对文件路径。
   * 目录在磁盘上可能不存在，创建目录由扩展负责。
   * 但是，父目录保证存在。
   *
   * 使用 {@linkcode StateManager.globalState} 存储键值数据。
   *
   * @deprecated 请改用 {@link ExtensionContext.globalStorageUri globalStorageUri}。
   */
  readonly globalStoragePath: string;

  /**
   * 扩展可以创建日志文件的目录的 uri。
   * 目录在磁盘上可能不存在，创建目录由扩展负责。
   * 但是，父目录保证存在。
   *
   * @see {@linkcode FileSystem workspace.fs} 了解如何从
   * uri 读取和写入文件和文件夹。
   */
  readonly logUri: URI;

  /**
   * 扩展可以创建日志文件的目录的绝对文件路径。
   * 目录在磁盘上可能不存在，创建目录由扩展负责。
   * 但是，父目录保证存在。
   *
   * @deprecated 请改用 {@link ExtensionContext.logUri logUri}。
   */
  readonly logPath: string;

  /**
   * 扩展运行的模式。请参见 {@link ExtensionMode}
   * 了解可能的值和场景。
   */
  readonly extensionMode: ExtensionMode;

  /**
   * 当前的 `Extension` 实例。
   */
  readonly extension: Extension<any>;
}

export enum ExtensionKind {
  /**
   * 扩展在 UI 运行的地方运行。
   */
  UI = 1,

  /**
   * 扩展在远程扩展主机运行的地方运行。
   */
  Workspace = 2,
}

interface Extension<T> {
  /**
   * 规范的扩展标识符，格式为：`publisher.name`。
   */
  readonly id: string;

  /**
   * 包含扩展的目录的 uri。
   */
  readonly extensionUri: URI;

  /**
   * 包含此扩展的目录的绝对文件路径。{@link Extension.extensionUri Extension.extensionUri.fsPath} 的简写
   * 表示法（与 uri 方案无关）。
   */
  readonly extensionPath: string;

  /**
   * 如果扩展已被激活，则为 `true`。
   */
  readonly isActive: boolean;

  /**
   * 扩展的 package.json 的解析内容。
   */
  readonly packageJSON: any;

  /**
   * 扩展种类描述了扩展是在 UI 运行的地方运行
   * 还是在远程扩展主机运行的地方运行。扩展种类
   * 在扩展的 `package.json` 文件中定义，但也可以通过
   * `remote.extensionKind` 设置进行细化。当不存在
   * 远程扩展主机时，值为 {@linkcode ExtensionKind.UI}。
   */
  extensionKind: ExtensionKind;

  /**
   * 此扩展导出的公共 API（`activate` 的返回值）。
   * 在此扩展激活之前访问此字段是无效操作。
   */
  readonly exports: T;

  /**
   * 激活此扩展并返回其公共 API。
   *
   * @returns 当此扩展被激活时将解析的 Promise。
   */
  activate(): Thenable<T>;
}
