import { T } from "./Language";
import { Icon } from "./Icon";
export function CvVersionNotice() {
  return (
    <div className="notice">
      <Icon name="book" />
      <div>
        <strong>
          <T zh="线上版功能有限，离线版功能更完整">
            The online version has limited functionality
          </T>
        </strong>
        <p>
          <T zh="线上版部分功能缺失，部分更新尚未同步。离线版提供更完整的分析工作流；各历史版本供查看，暂不开放下载。">
            Some features are missing from the online version, and some updates
            have not yet been synchronized. The offline version offers a more
            complete analysis workflow. Offline versions are listed for
            reference; downloads are temporarily unavailable.
          </T>
        </p>
      </div>
    </div>
  );
}
