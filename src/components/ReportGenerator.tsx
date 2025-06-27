import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';
import { FileDown, Share2, Badge, Check, Copy } from 'lucide-react';
import { Button } from './ui/button';
import { AnalysisResult } from '@/utils/types';
import * as htmlToImage from 'html-to-image';

interface ReportGeneratorProps {
  result: AnalysisResult;
  text: string;
}

export const ReportGenerator: React.FC<ReportGeneratorProps> = ({ result, text }) => {
  const [copied, setCopied] = useState(false);
  // Check if Web Share API is supported AND we're in a secure context
  const canShare = typeof navigator.share !== 'undefined' && window.isSecureContext;

  const generateQRCode = async (data: string): Promise<string> => {
    try {
      return await QRCode.toDataURL(data, {
        errorCorrectionLevel: 'H',
        margin: 1,
        width: 200,
        color: {
          dark: '#000000',
          light: '#ffffff',
        },
      });
    } catch (err) {
      console.error('QR Code generation failed:', err);
      return '';
    }
  };

  const generatePDF = async () => {
    const element = document.getElementById('analysis-results');
    if (!element) return;

    try {
      // Create PDF in A4 format
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Generate QR code for verification
      const verificationData = {
        text: text.substring(0, 100) + '...',
        credibilityScore: result.credibilityScore,
        timestamp: new Date().toISOString(),
        warnings: result.warnings,
        suggestions: result.suggestions,
      };
      const qrCode = await generateQRCode(JSON.stringify(verificationData));

      // Convert results to image
      const dataUrl = await htmlToImage.toPng(element, {
        quality: 1.0,
        pixelRatio: 2,
        backgroundColor: '#ffffff'
      });

      // PDF Header
      pdf.setFillColor(33, 64, 175); // Primary blue color
      pdf.circle(30, 20, 8, 'F');
      
      pdf.setFontSize(24);
      pdf.setTextColor(33, 64, 175);
      pdf.text('AI Fake News Analysis Report', 45, 25);

      // Add timestamp and report ID
      pdf.setFontSize(10);
      pdf.setTextColor(100);
      const reportId = Math.random().toString(36).substring(2, 15);
      pdf.text(`Report ID: ${reportId}`, 45, 32);
      pdf.text(`Generated: ${new Date().toLocaleString()}`, 45, 37);

      // Add QR verification code
      pdf.addImage(qrCode, 'PNG', 160, 10, 30, 30);
      pdf.setFontSize(8);
      pdf.text('Scan to verify', 165, 43);

      // Credibility Score Section
      pdf.setFontSize(16);
      pdf.setTextColor(0);
      pdf.text('Credibility Assessment', 20, 55);
      
      // Add score indicator
      const scoreColor = result.credibilityScore >= 80 ? '#22c55e' : 
                        result.credibilityScore >= 60 ? '#eab308' : '#ef4444';
      pdf.setFillColor(scoreColor);
      pdf.circle(30, 65, 8, 'F');
      pdf.setFontSize(20);
      pdf.setTextColor(0);
      pdf.text(`${result.credibilityScore}/100`, 45, 68);

      // Analyzed Content Section
      pdf.setFontSize(14);
      pdf.text('Analyzed Content', 20, 85);
      pdf.setFontSize(10);
      const textLines = pdf.splitTextToSize(text, 170);
      pdf.text(textLines, 20, 92);

      // Calculate height needed for text
      const textHeight = (textLines.length * 3.5); // 3.5mm per line
      const startY = 95 + textHeight;

      // Add analysis results image
      const imgWidth = 170;
      const imgHeight = 100;
      pdf.addImage(dataUrl, 'PNG', 20, startY, imgWidth, imgHeight);

      // Key Findings Section
      let yPos = startY + imgHeight + 10;
      
      pdf.setFontSize(14);
      pdf.text('Key Findings', 20, yPos);
      yPos += 8;

      // Add fact check results
      pdf.setFontSize(10);
      pdf.text(`Factual Assessment: ${result.factCheck.isFactual ? '✓ Verified' : '⚠ Unverified'}`, 25, yPos);
      yPos += 5;
      
      const explanationLines = pdf.splitTextToSize(result.factCheck.explanation, 160);
      pdf.text(explanationLines, 25, yPos);
      yPos += (explanationLines.length * 5) + 5;

      // Add warnings if any
      if (result.warnings.length > 0) {
        pdf.setFontSize(12);
        pdf.setTextColor(220, 38, 38); // Red for warnings
        pdf.text('Warnings:', 20, yPos);
        yPos += 5;
        pdf.setFontSize(10);
        result.warnings.forEach(warning => {
          const warningLines = pdf.splitTextToSize(`• ${warning}`, 160);
          pdf.text(warningLines, 25, yPos);
          yPos += (warningLines.length * 5);
        });
        yPos += 5;
      }

      // Add suggestions
      if (result.suggestions.length > 0) {
        pdf.setFontSize(12);
        pdf.setTextColor(33, 64, 175); // Blue for suggestions
        pdf.text('Suggestions:', 20, yPos);
        yPos += 5;
        pdf.setFontSize(10);
        result.suggestions.forEach(suggestion => {
          const suggestionLines = pdf.splitTextToSize(`• ${suggestion}`, 160);
          pdf.text(suggestionLines, 25, yPos);
          yPos += (suggestionLines.length * 5);
        });
      }

      // Add footer with page numbers
      const pageCount = pdf.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        pdf.setPage(i);
        pdf.setFontSize(8);
        pdf.setTextColor(150);
        pdf.text(
          `Generated by AI Fake News Detector | Page ${i} of ${pageCount}`,
          pdf.internal.pageSize.getWidth() / 2,
          pdf.internal.pageSize.getHeight() - 10,
          { align: 'center' }
        );
      }

      pdf.save('fake-news-analysis.pdf');
    } catch (error) {
      console.error('PDF generation failed:', error);
    }
  };

  const generateVerificationBadge = async () => {
    const badgeData = {
      score: result.credibilityScore,
      date: new Date().toISOString(),
      verified: result.credibilityScore >= 80,
    };

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 400;
    canvas.height = 400;
    ctx.scale(2, 2);

    const gradient = ctx.createRadialGradient(100, 100, 0, 100, 100, 90);
    if (badgeData.verified) {
      gradient.addColorStop(0, '#22c55e');
      gradient.addColorStop(1, '#16a34a');
    } else {
      gradient.addColorStop(0, '#ef4444');
      gradient.addColorStop(1, '#dc2626');
    }

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(100, 100, 90, 0, Math.PI * 2);
    ctx.fill();

    ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 2;

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 48px Inter, system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${badgeData.score}`, 100, 85);

    ctx.font = '16px Inter, system-ui, sans-serif';
    ctx.fillText('Credibility Score', 100, 120);

    ctx.font = '14px Inter, system-ui, sans-serif';
    ctx.fillText(badgeData.verified ? 'VERIFIED' : 'UNVERIFIED', 100, 140);

    ctx.font = '10px Inter, system-ui, sans-serif';
    ctx.fillText(new Date().toLocaleDateString(), 100, 160);

    const link = document.createElement('a');
    link.download = 'verification-badge.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const getShareText = () => {
    return `Content Analysis Results:

Credibility Score: ${result.credibilityScore}/100
Factual Assessment: ${result.factCheck.isFactual ? '✓ Verified' : '⚠ Unverified'}

Key Findings:
${result.factCheck.explanation}

Analysis Details:
${result.sentiment ? `- Sentiment: ${result.sentiment.label} (${result.sentiment.score.toFixed(2)})` : ''}
${result.readability ? `- Readability: ${result.readability.level} (Score: ${result.readability.score})` : ''}
${result.bias ? `- Bias Assessment: ${result.bias.explanation}` : ''}

Generated by AI Fake News Detector`;
  };

  const handleShare = async () => {
    const shareText = getShareText();

    try {
      if (canShare) {
        // Use native share if available and in a secure context
        await navigator.share({
          title: 'AI Fake News Analysis',
          text: shareText,
        });
      } else {
        // Fallback to clipboard
        await navigator.clipboard.writeText(shareText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (error) {
      // If share fails, fallback to clipboard
      try {
        await navigator.clipboard.writeText(shareText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (clipboardError) {
        console.error('Failed to copy to clipboard:', clipboardError);
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <Button onClick={generatePDF} className="flex items-center gap-2">
          <FileDown className="h-4 w-4" />
          Generate PDF Report
        </Button>
        <Button onClick={generateVerificationBadge} variant="outline" className="flex items-center gap-2">
          <Badge className="h-4 w-4" />
          Get Verification Badge
        </Button>
        <Button onClick={handleShare} variant="outline" className="flex items-center gap-2">
          {copied ? (
            <>
              <Check className="h-4 w-4" />
              Copied!
            </>
          ) : (
            <>
              {canShare ? <Share2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {canShare ? 'Share Analysis' : 'Copy Analysis'}
            </>
          )}
        </Button>
      </div>

      <div className="bg-muted p-4 rounded-lg">
        <h3 className="text-sm font-medium mb-2">About Reports</h3>
        <p className="text-sm text-muted-foreground">
          PDF reports include detailed analysis, verification QR code, and timestamped results.
          Verification badges can be embedded in websites or shared on social media.
        </p>
      </div>
    </div>
  );
};