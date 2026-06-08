import React from 'react';
import { Certificate } from '../services/certificateService';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Award, Download, ExternalLink } from 'lucide-react';

interface CertificateCardProps {
  certificate: Certificate;
}

export const CertificateCard = ({ certificate }: CertificateCardProps) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="aspect-[1.414/1] bg-muted relative flex items-center justify-center p-8">
        <div className="absolute inset-4 border-2 border-primary/20 rounded-sm pointer-events-none" />
        <Award className="h-20 w-20 text-primary/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>
      <CardHeader>
        <CardTitle className="text-lg line-clamp-1">{certificate.course_title}</CardTitle>
        <div className="text-xs text-muted-foreground">
          Issued on {new Date(certificate.issued_at).toLocaleDateString()}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-xs font-mono text-muted-foreground">
          ID: {certificate.certificate_number}
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="outline" size="sm" className="flex-1" asChild>
          <a href={certificate.preview_url} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="mr-2 h-4 w-4" />
            View
          </a>
        </Button>
        <Button size="sm" className="flex-1" asChild>
          <a href={certificate.download_url} download>
            <Download className="mr-2 h-4 w-4" />
            Download
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};
