import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Copy, Share2, X } from 'lucide-react';
import { translate } from '@docusaurus/Translate';
import { getUsernameFromCookie, getCurrentUrlFromCookie, updateLaunchAppHref } from './FromCookie';

interface ShareButtonProps {
    walletAddress?: string;
    inline?: boolean;
}

export function ShareButton({ walletAddress: propWalletAddress, inline = false }: ShareButtonProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [walletAddress, setWalletAddress] = useState(propWalletAddress || '');
    const [shortUrl, setShortUrl] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    // 多语言文本
    const translations = {
        share: translate({ id: 'shareButton.label', message: '分享', description: 'Label for the share button' }),
        modalTitle: translate({ id: 'shareButton.modal.title', message: '分享链接生成器', description: 'Title of the share modal' }),
        modalDescription: translate({ id: 'shareButton.modal.description', message: '输入您的钱包地址以生成专属分享链接', description: 'Description in the share modal' }),
        walletAddressLabel: translate({ id: 'shareButton.walletAddress.label', message: '钱包地址', description: 'Label for wallet address input' }),
        walletAddressPlaceholder: translate({ id: 'shareButton.walletAddress.placeholder', message: '请输入您的钱包地址', description: 'Placeholder for wallet address input' }),
        generatedUrlLabel: translate({ id: 'shareButton.generatedUrl.label', message: '您的分享链接', description: 'Label for generated URL' }),
        generateButton: translate({ id: 'shareButton.generate.button', message: '生成分享链接', description: 'Button text for generating share link' }),
        generatingButton: translate({ id: 'shareButton.generating.button', message: '生成中...', description: 'Button text when generating share link' }),
        copyButton: translate({ id: 'shareButton.copy.button', message: '复制链接', description: 'ARIA label for copy button' }),
        closeButton: translate({ id: 'shareButton.close.button', message: '关闭', description: 'ARIA label for close button' }),
        errorEmptyWallet: translate({ id: 'shareButton.error.emptyWallet', message: '请输入钱包地址', description: 'Error message when wallet address is empty' }),
        errorInvalidWallet: translate({ id: 'shareButton.error.invalidWallet', message: '请输入有效的钱包地址', description: 'Error message when wallet address is invalid' }),
        successLinkGenerated: translate({ id: 'shareButton.success.linkGenerated', message: '短链接已生成: ', description: 'Success message when link is generated' }),
        successCopied: translate({ id: 'shareButton.success.copied', message: '链接已复制到剪贴板', description: 'Success message when link is copied' }),
        errorCopyFailed: translate({ id: 'shareButton.error.copyFailed', message: '复制失败，请手动复制:', description: 'Error message when copy fails' }),
        error: translate({ id: 'shareButton.error', message: '成功', description: 'Error message' }),
        success: translate({ id: 'shareButton.success', message: '失败', description: 'Success message' }),
    };

    useEffect(() => {
        getUsernameFromCookies();
    }, []);

    // 从 cookie 获取用户名
    function getUsernameFromCookies() {
        if (typeof document === 'undefined') return '';
        // let name: any = document.cookie.match(new RegExp(`(^| )username=([^;]+)`));
        // name = name ? decodeURIComponent(name[2]) : "";
        // const currentUrl = window.location.href;
        // let url: any = document.cookie.match(new RegExp(`(^| )${currentUrl}=([^;]+)`));
        // url = url ? decodeURIComponent(url[2]) : "";
        setWalletAddress(getUsernameFromCookie());
        setShortUrl(getCurrentUrlFromCookie());
        updateLaunchAppHref(getUsernameFromCookie());
        console.log("cookie-name:", getUsernameFromCookie(), "--url:", getCurrentUrlFromCookie())
    };
    // getUsernameFromCookie();
    function isValidETHAddress(address: string) {
        return /^0x[a-fA-F0-9]{40}$/.test(address);
    }
    const generateShortUrl = async () => {
        if (!walletAddress.trim()) {
            alert(translations.errorEmptyWallet);
            return;
        }

        // 验证钱包地址格式（简化版验证）
        if (!isValidETHAddress(walletAddress)) {
            alert(translations.errorInvalidWallet);
            return;
        }

        setIsGenerating(true);


        try {
            const currentUrl = window.location.href;
            const response = await fetch('/api/generate-short-link', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    originalUrl: currentUrl,
                    username: walletAddress
                })
            });

            const data = await response.json();
            if (response.ok) {
                // console.log("----", data)
                // setWalletAddress(name);
                setShortUrl(data.shortUrl);
                setIsGenerating(false);
                // 保存用户名到 cookie (30 天有效期)
                document.cookie = `username=${encodeURIComponent(walletAddress)}; max-age=${300 * 24 * 60 * 60}; path=/`;
                document.cookie = `${currentUrl}=${encodeURIComponent(data.shortUrl)}; max-age=${300 * 24 * 60 * 60}; path=/`;
            } else {
                // throw new Error(data.error || '生成失败');
                alert(translations.error);
            }
        } catch (err: any) {
            alert(translations.error);
            // throw new Error(err.message || '请求失败');
        }
        // 模拟生成短链接的过程
        // setTimeout(() => {
        //     // 实际应用中这里会调用API生成短链接
        //     const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
        //     const referralParam = `ref=${encodeURIComponent(walletAddress)}`;

        //     // 创建带推荐参数的完整URL
        //     let fullUrl = '';
        //     if (typeof window !== 'undefined') {
        //         const currentUrl = new URL(window.location.href);
        //         currentUrl.searchParams.set('ref', walletAddress);
        //         fullUrl = currentUrl.toString();
        //     }

        //     // 生成短链接（模拟）
        //     const shortCode = btoa(walletAddress).substring(0, 8);
        //     const generatedShortUrl = `${baseUrl}/share/${shortCode}`;

        //     setShortUrl(generatedShortUrl);
        //     setIsGenerating(false);

        //     alert(translations.successLinkGenerated + generatedShortUrl);
        // }, 500);
    };

    const copyToClipboard = () => {
        if (!shortUrl) return;

        navigator.clipboard.writeText(shortUrl).then(() => {
            alert(translations.successCopied);
        }).catch(() => {
            // Fallback for copying text
            const textArea = document.createElement("textarea");
            textArea.value = shortUrl;
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            try {
                document.execCommand('copy');
                alert(translations.successCopied);
            } catch (err) {
                prompt(translations.errorCopyFailed, shortUrl);
            }
            document.body.removeChild(textArea);
        });
    };

    const handleOpenChange = (open: boolean) => {
        setIsOpen(open);
        // if (!open) {
        //     // 关闭对话框时重置状态
        //     setShortUrl('');
        //     if (!propWalletAddress) {
        //         setWalletAddress('');
        //     }
        // }
    };

    const triggerButton = (
        <Button
            variant="outline"
            className={inline ? 'share-button share-button--inline' : 'share-button'}
            onClick={() => setIsOpen(true)}
        >
            <Share2 style={{ width: '1rem', height: '1rem' }} />
            {translations.share}
        </Button>
    );

    if (isOpen) {
        return (
            <>
                {inline ? triggerButton : (
                    <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
                        {triggerButton}
                    </div>
                )}

                {/* 自定义模态框 - 使用CSS类确保在MD文件中正常显示 */}
                <div className="share-modal-overlay">
                    <div className="share-modal-content">
                        <div className="share-modal-header">
                            <h3 className="share-modal-title">{translations.modalTitle}</h3>
                            <button
                                onClick={() => handleOpenChange(false)}
                                className="share-modal-close-button"
                                aria-label={translations.closeButton}
                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            >
                                <X style={{ width: '1.25rem', height: '1.25rem' }} />
                            </button>
                        </div>

                        <div className="share-modal-body">
                            <p className="share-modal-description">
                                {translations.modalDescription}
                            </p>

                            {!propWalletAddress && (
                                <div className="share-modal-input-group">
                                    <label htmlFor="wallet-address" className="share-modal-label">
                                        {translations.walletAddressLabel}
                                    </label>
                                    <Input
                                        id="wallet-address"
                                        value={walletAddress}
                                        onChange={(e) => setWalletAddress(e.target.value)}
                                        placeholder={translations.walletAddressPlaceholder}
                                        className="share-modal-input"
                                    />
                                </div>
                            )}

                            {shortUrl ? (
                                <div className="share-modal-input-group">
                                    <label htmlFor="short-url" className="share-modal-label">
                                        {translations.generatedUrlLabel}
                                    </label>
                                    <div className="share-modal-button-group">
                                        <Input
                                            id="short-url"
                                            readOnly
                                            value={shortUrl}
                                            className="share-modal-input"
                                        />
                                        <Button
                                            type="button"
                                            onClick={copyToClipboard}
                                            size="icon"
                                            className="share-modal-icon-button"
                                            aria-label={translations.copyButton}
                                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                        >
                                            <Copy style={{ width: '1rem', height: '1rem' }} />
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <Button
                                    type="button"
                                    onClick={generateShortUrl}
                                    disabled={isGenerating || (!walletAddress && !propWalletAddress)}
                                    className="share-modal-primary-button"
                                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                                >
                                    {isGenerating ? (
                                        <>
                                            <span>{translations.generatingButton}</span>
                                        </>
                                    ) : (
                                        <span>{translations.generateButton}</span>
                                    )}
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return inline ? triggerButton : (
        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
            {triggerButton}
        </div>
    );
}