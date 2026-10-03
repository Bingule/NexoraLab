import { T } from "./Language";
export function WindowsActivation({
  compact = false,
  downloadAvailable = false,
}: {
  compact?: boolean;
  downloadAvailable?: boolean;
}) {
  if (compact)
    return (
      <p className="activation-label">
        <T zh="Windows 版 — 需要激活">Windows version — activation required</T>
      </p>
    );
  return (
    <div className="notice">
      <div>
        <strong>
          <T zh="Windows 版 — 需要激活">
            Windows version — activation required
          </T>
        </strong>
        <p>
          <T zh="Windows 客户端可公开下载，但使用需要有效的本机授权。首次启动后复制机器码并发给开发者；开发者手动签发激活授权，再按客户端提示输入激活码或导入授权文件。">
            The Windows client can be downloaded publicly, but use requires a
            valid machine-bound license. On first launch, copy the Machine ID
            and send it to the developer. The developer manually issues
            activation; enter the code or import the license file as instructed
            by the client.
          </T>
        </p>
        {!downloadAvailable && (
          <p>
            <T zh="Windows 客户端下载将在其发布包上线后提供。">
              The Windows client download will be listed when its release
              package is published.
            </T>
          </p>
        )}
      </div>
    </div>
  );
}
