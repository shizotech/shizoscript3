FFmpeg 9.0.2 for nanogui.video (linux_arm64)

These are the shared libraries of an LGPL build of FFmpeg, unchanged:
  libavutil.so.61, libswresample.so.7, libswscale.so.10, libavcodec.so.63, libavformat.so.63
Build:   ffmpeg-n9.0.2-28-g669f5ab083-linuxarm64-lgpl-shared-9.0.tar.xz (BtbN/FFmpeg-Builds, release autobuild-2026-10-17-20-51)
SHA-256: a2d10bce2f3aacb000fb00b1edbb745fc3caf11c3e3f76e623b213397be874cf
Source:  https://github.com/FFmpeg/FFmpeg/tree/669f5ab083
         build scripts: https://github.com/BtbN/FFmpeg-Builds
Mirror:  https://github.com/shizotech/shizoscript3/releases/download/ffmpeg-9.0.2-lgpl-shared/

FFmpeg is licensed under the GNU Lesser General Public License version 3
(the build uses --enable-version3), see LICENSE.txt and https://ffmpeg.org/legal.html.

You may replace these files with your own build of FFmpeg, as long as it has the
same major versions (the numbers in the file names). nanogui loads them at run
time; the environment variable SHZ_FFMPEG_DIR points it at another folder.
