<div align="center">
<h1>Go Ldap Admin</h1>

**English** | [Chinese](./README.md)

[![Auth](https://img.shields.io/badge/Auth-eryajf-ff69b4)](https://github.com/eryajf)
[![Go Version](https://img.shields.io/github/go-mod/go-version/eryajf-world/go-ldap-admin)](https://github.com/eryajf/go-ldap-admin)
[![Gin Version](https://img.shields.io/badge/Gin-1.6.3-brightgreen)](https://github.com/eryajf/go-ldap-admin)
[![Gorm Version](https://img.shields.io/badge/Gorm-1.24.5-brightgreen)](https://github.com/eryajf/go-ldap-admin)
[![GitHub Pull Requests](https://img.shields.io/github/stars/eryajf/go-ldap-admin)](https://github.com/eryajf/go-ldap-admin/stargazers)
[![HitCount](https://views.whatilearened.today/views/github/eryajf/go-ldap-admin.svg)](https://github.com/eryajf/go-ldap-admin)
[![GitHub license](https://img.shields.io/github/license/eryajf/go-ldap-admin)](https://github.com/eryajf/go-ldap-admin/blob/main/LICENSE)
[![Commits](https://img.shields.io/github/commit-activity/m/eryajf/go-ldap-admin?color=ffff00)](https://github.com/eryajf/go-ldap-admin/commits/main)

<p>An OpenLDAP administration platform built with Go + Vue</p>

<img src="https://cdn.jsdelivr.net/gh/eryajf/tu@main/img/image_20240420_214408.gif" width="800"  height="3">
</div><br>

<p align="center">
  <a href="" rel="noopener">
 <img src="https://cdn.jsdelivr.net/gh/eryajf/tu/img/image_20220614_131521.jpg" alt="Project logo"></a>
</p>

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Contents**

- [Introduction](#introduction)
- [Online Demo](#online-demo)
- [Project Repositories](#project-repositories)
- [Documentation Links](#documentation-links)
- [Acknowledgements](#acknowledgements)
- [One More Thing](#one-more-thing)
- [Donation](#donation)
- [User Registration](#user-registration)
- [Recommended Software](#recommended-software)
- [Contributors](#contributors)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Introduction

`go-ldap-admin` aims to provide a simple, easy-to-use, clean, and modern administration console for `OpenLDAP`.

> In addition to OpenLDAP administration, the project supports integration with `DingTalk`, `WeCom`, and `Lark`. Users can manually or automatically synchronize organization structures and employee information into the platform, making `go-ldap-admin` a bridge between enterprise IM systems and internal enterprise applications.

UI and API messages support `en-US` (default), `zh-CN`, `ja-JP`, `es-ES`, and `ko-KR`. Backend locale files are in `locales/`, and frontend locale files are in `src/lang/`. The UI language selector stores the selected locale and sends it in the `X-Locale` request header; the backend reads that header and falls back to `Accept-Language`.

## Online Demo

The online demo is available at:

- URL: [https://demo-go-ldap-admin.eryajf.net/](https://demo-go-ldap-admin.eryajf.net/)
- Login: admin/123456

> The demo environment may be unstable. If access fails or data becomes inconsistent, please contact the author for recovery. Do not enter personal or sensitive information.

**Feature overview:**

|    ![Login page](https://cdn.jsdelivr.net/gh/eryajf/tu/img/image_20220724_165411.png)    | ![Home](https://cdn.jsdelivr.net/gh/eryajf/tu/img/image_20220724_165545.png)      |
| :----------------------------------------------------------------------------------: | --------------------------------------------------------------------------------- |
|   ![User management](https://cdn.jsdelivr.net/gh/eryajf/tu/img/image_20220724_165623.png)   | ![Group management](https://cdn.jsdelivr.net/gh/eryajf/tu/img/image_20220724_165701.png)  |
| ![Field relation management](https://cdn.jsdelivr.net/gh/eryajf/tu/img/image_20220724_165853.png) | ![Menu management](https://cdn.jsdelivr.net/gh/eryajf/tu/img/image_20220724_165954.png)  |
|   ![API management](https://cdn.jsdelivr.net/gh/eryajf/tu/img/image_20220724_170015.png)   | ![Operation logs](https://cdn.jsdelivr.net/gh/eryajf/tu/img/image_20220724_170035.png)  |
|  ![Swagger](https://cdn.jsdelivr.net/gh/eryajf/tu@main/img/image_20240521_213841.png)   | ![Swagger](https://cdn.jsdelivr.net/gh/eryajf/tu@main/img/image_20240521_214025.png) |

## Project Repositories

| Category |                     GitHub                     |   CNB |                     Gitee                        |
| :--: | :--------------------------------------------: | :-------------------------------------------------:| :-------------------------------------------------: |
| Backend |  [go-ldap-admin](https://github.com/opsre/go-ldap-admin.git)   | [go-ldap-admin](https://cnb.cool/opsre/go-ldap-admin.git) | [go-ldap-admin](https://gitee.com/eryajf-world/go-ldap-admin.git)   |
| Frontend | [go-ldap-admin-ui](https://github.com/opsre/go-ldap-admin-ui.git) | [go-ldap-admin-ui](https://cnb.cool/opsre/go-ldap-admin-ui.git) | [go-ldap-admin-ui](https://gitee.com/eryajf-world/go-ldap-admin-ui.git) |

## Documentation Links

Project introductions, usage, and best practices are available in the official documentation. If you have questions, please read the documentation first. Common links are listed below.

- [Official website](http://ldapdoc.eryajf.net)
- [Project background](http://ldapdoc.eryajf.net/pages/101948/)
- [Quick start](http://ldapdoc.eryajf.net/pages/706e78/)
- [Feature overview](http://ldapdoc.eryajf.net/pages/7a40de/)
- [Local development](http://ldapdoc.eryajf.net/pages/cb7497/)

> **Notes:**
>
> - Deploying and using this project requires some knowledge of OpenLDAP. If you want to configure IM synchronization, basic Go knowledge may also be needed for debugging when issues occur.
> - The documentation covers the supported topics in detail, so free support is not provided for issues already covered there. If you encounter problems during installation or deployment, you can request help through the [paid service](http://ldapdoc.eryajf.net/pages/7eab1c/).

## Acknowledgements

Thanks to the following excellent projects. Without them, `go-ldap-admin` would not exist:

- Backend stack
  - [Gin-v1.6.3](https://github.com/gin-gonic/gin)
  - [Gorm-v1.24.5](https://github.com/go-gorm/gorm)
  - [Sqlite-v1.7.0](https://github.com/glebarez/sqlite)
  - [Go-ldap-v3.4.2](https://github.com/go-ldap/ldap)
  - [Casbin-v2.22.0](https://github.com/casbin/casbin)
- Frontend stack
  - [axios](https://github.com/axios/axios)
  - [element-ui](https://github.com/ElemeFE/element)
- Special thanks
  - [go-web-mini](https://github.com/gnimli/go-web-mini): this project was refactored based on `go-web-mini`. Thanks to the author for the original work.
  - Thanks to [nangongchengfeng](https://github.com/nangongchengfeng) for contributing the [Swagger](https://github.com/eryajf/go-ldap-admin/pull/345) feature.

## One More Thing

- If you find this project useful, please give it a star.
- If you have other ideas or feature requests, feel free to discuss them in issues.

## Donation

If this project helps you, you can buy the author a coffee: [click here](http://ldapdoc.eryajf.net/pages/2b6725/)

## User Registration

If your company uses this project, please leave a note here. Thank you for your support: [click here](https://github.com/eryajf/go-ldap-admin/issues/18)

## Recommended Software

- [TenSunS: an efficient and easy-to-use Consul Web operations platform](https://github.com/starsliao/TenSunS)
- [Next Terminal: a simple, easy-to-use, secure open-source interactive audit bastion host](https://github.com/dushixiang/next-terminal)

## Contributors

<!-- readme: collaborators,contributors -start -->
<table>
<tr>
    <td align="center">
        <a href="https://github.com/eryajf">
            <img src="https://avatars.githubusercontent.com/u/33259379?v=4" width="100;" alt="eryajf"/>
            <br />
            <sub><b>Er Ya Jiang Fan</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/OTR37">
            <img src="https://avatars.githubusercontent.com/u/51768167?v=4" width="100;" alt="OTR37"/>
            <br />
            <sub><b>OTR37</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/xinyuandd">
            <img src="https://avatars.githubusercontent.com/u/3397848?v=4" width="100;" alt="xinyuandd"/>
            <br />
            <sub><b>Xinyuandd</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/wang-xiaowu">
            <img src="https://avatars.githubusercontent.com/u/44340137?v=4" width="100;" alt="wang-xiaowu"/>
            <br />
            <sub><b>Xiaowu</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/nangongchengfeng">
            <img src="https://avatars.githubusercontent.com/u/46562911?v=4" width="100;" alt="nangongchengfeng"/>
            <br />
            <sub><b>Nan Gong Cheng Feng</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/nnsay">
            <img src="https://avatars.githubusercontent.com/u/14331919?v=4" width="100;" alt="nnsay"/>
            <br />
            <sub><b>Jimmy Wang</b></sub>
        </a>
    </td></tr>
<tr>
    <td align="center">
        <a href="https://github.com/Sdaiyan">
            <img src="https://avatars.githubusercontent.com/u/53208364?v=4" width="100;" alt="Sdaiyan"/>
            <br />
            <sub><b>Sdaiyan</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/xzzgwzh">
            <img src="https://avatars.githubusercontent.com/u/133201531?v=4" width="100;" alt="xzzgwzh"/>
            <br />
            <sub><b>Xzzgwzh</b></sub>
        </a>
    </td></tr>
</table>
<!-- readme: collaborators,contributors -end -->
