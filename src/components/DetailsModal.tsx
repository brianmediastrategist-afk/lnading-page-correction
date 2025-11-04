import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  image: string;
  details: string;
  onBookMeeting: () => void;
}

export default function DetailsModal({
  isOpen,
  onClose,
  title,
  image,
  details,
  onBookMeeting,
}: DetailsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-black">{title}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
          {/* Left: Image */}
          <div className="flex items-center justify-center">
            <div className="w-full aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right: Text & CTA */}
          <div className="flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <p className="text-muted-foreground text-lg leading-relaxed">
                {details}
              </p>

              <div className="bg-accent/10 border border-accent/20 rounded-xl p-4 space-y-2">
                <h4 className="font-bold text-secondary">What You'll Get:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                    <span>Custom strategy tailored to your business</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                    <span>Implementation roadmap</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                    <span>Quick wins to start immediately</span>
                  </li>
                </ul>
              </div>
            </div>

            <Button
              size="lg"
              onClick={() => {
                onBookMeeting();
                onClose();
              }}
              className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-lg transition-all"
            >
              Book a Meeting
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
